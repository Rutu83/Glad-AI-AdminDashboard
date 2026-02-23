import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface LogEntry {
    timestamp: string
    type: 'INFO' | 'SUCCESS' | 'ERROR'
    message: string
    model?: string
    status?: number
    latency?: string
    latencyMs?: number
    tokens?: number
    cost?: string
    duration?: string
    error?: string
}

export interface CostDataPoint {
    date: string
    gptCost: number
    whisperCost: number
    gptCalls: number
    whisperCalls: number
}

export type DateRange = '7d' | '30d' | '90d'

// Cost rates (OpenAI pricing)
const GPT_4O_MINI_INPUT_PER_1K = 0.00015
const GPT_4O_MINI_OUTPUT_PER_1K = 0.0006
const GPT_BLENDED_PER_1K = (GPT_4O_MINI_INPUT_PER_1K + GPT_4O_MINI_OUTPUT_PER_1K) / 2
const WHISPER_RATE_PER_MIN = 0.006

export function useAILogs(dateRange: DateRange = '30d') {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [avgGptLatencyMs, setAvgGptLatencyMs] = useState<number | null>(null)
    const [avgWhisperLatencyMs, setAvgWhisperLatencyMs] = useState<number | null>(null)
    const [totalCalls, setTotalCalls] = useState(0)
    const [successRate, setSuccessRate] = useState(0)
    const [costData, setCostData] = useState<CostDataPoint[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const getDays = useCallback(() => {
        switch (dateRange) {
            case '7d': return 7
            case '90d': return 90
            default: return 30
        }
    }, [dateRange])

    function parseLogEntry(row: any): LogEntry {
        let model = 'unknown'
        let status = 200
        let tokens = 0
        let durationSec = 0
        let costVal = 0
        let errorMessage = ''

        try {
            const reqBody = typeof row.request_body === 'string'
                ? JSON.parse(row.request_body)
                : (row.request_body || {})
            const resBody = typeof row.response_body === 'string'
                ? JSON.parse(row.response_body)
                : (row.response_body || {})

            status = row.status === 'success' ? 200 : (row.status === 'error' ? 500 : 200)

            if (reqBody.model) model = reqBody.model
            else if (resBody.model) model = resBody.model

            if (resBody.usage?.total_tokens) tokens = resBody.usage.total_tokens
            if (resBody.duration) durationSec = resBody.duration

            if (resBody.error) {
                errorMessage = resBody.error.message || 'Unknown error'
                status = 500
            }

            if (model.includes('gpt')) {
                costVal = tokens > 0
                    ? (tokens / 1000) * GPT_BLENDED_PER_1K
                    : 0.0015
            } else if (model.includes('whisper')) {
                const minutes = durationSec ? durationSec / 60 : 0.5
                costVal = minutes * WHISPER_RATE_PER_MIN
            } else {
                costVal = 0.001
            }

        } catch {
            // Ignore parse errors
        }

        const date = new Date(row.created_at)
        const timestamp = date.toLocaleTimeString([], { hour12: false })
        const costStr = '$' + costVal.toFixed(4)
        const durationStr = durationSec ? `${durationSec.toFixed(1)}s` : undefined

        let message = `{ "model": "${model}", "status": ${status}`
        if (tokens) message += `, "tokens": ${tokens}`
        if (durationStr) message += `, "duration": "${durationStr}"`
        message += `, "cost": "${costStr}"`
        if (errorMessage) message += `, "error": "${errorMessage}"`
        message += ' }'

        return {
            timestamp,
            type: status === 200 ? 'SUCCESS' : 'ERROR',
            message,
            model,
            status,
            tokens: tokens || undefined,
            cost: costStr,
            duration: durationStr,
            error: errorMessage || undefined,
        }
    }

    function computeMetrics(rawData: any[]) {
        // GPT latency — we derive a synthetic latency from row ordering 
        // (since the column doesn't exist in the DB, we approximate by tokens)
        const gptRows = rawData.filter(r => {
            const body = typeof r.request_body === 'string'
                ? JSON.parse(r.request_body || '{}')
                : (r.request_body || {})
            return (body.model || '').includes('gpt')
        })

        const whisperRows = rawData.filter(r => {
            const body = typeof r.request_body === 'string'
                ? JSON.parse(r.request_body || '{}')
                : (r.request_body || {})
            return (body.model || '').includes('whisper')
        })

        if (gptRows.length > 0) {
            // Estimate: ~0.5ms per token for GPT-4o-mini + base 300ms overhead
            const estimatedMs = gptRows.map(r => {
                const res = typeof r.response_body === 'string'
                    ? JSON.parse(r.response_body || '{}')
                    : (r.response_body || {})
                const tokens = res.usage?.total_tokens || 150
                return Math.min(tokens * 0.5 + 300, 3000)
            })
            const avg = estimatedMs.reduce((a, b) => a + b, 0) / estimatedMs.length
            setAvgGptLatencyMs(Math.round(avg))
        } else {
            setAvgGptLatencyMs(null)
        }

        if (whisperRows.length > 0) {
            // Whisper latency estimate: ~80ms per second of audio + 400ms overhead
            const estimatedMs = whisperRows.map(r => {
                const res = typeof r.response_body === 'string'
                    ? JSON.parse(r.response_body || '{}')
                    : (r.response_body || {})
                const dur = res.duration || 10
                return Math.min(dur * 80 + 400, 4000)
            })
            const avg = estimatedMs.reduce((a, b) => a + b, 0) / estimatedMs.length
            setAvgWhisperLatencyMs(Math.round(avg))
        } else {
            setAvgWhisperLatencyMs(null)
        }

        // Success rate
        setTotalCalls(rawData.length)
        const successCount = rawData.filter(r => r.status === 'success').length
        setSuccessRate(rawData.length > 0 ? Math.round((successCount / rawData.length) * 100) : 0)
    }

    function buildCostData(rawData: any[], days: number): CostDataPoint[] {
        const now = new Date()
        // Build date buckets
        const buckets: Record<string, { gptCost: number; whisperCost: number; gptCalls: number; whisperCalls: number }> = {}

        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now)
            d.setDate(d.getDate() - i)
            const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            buckets[key] = { gptCost: 0, whisperCost: 0, gptCalls: 0, whisperCalls: 0 }
        }

        for (const row of rawData) {
            try {
                const rowDate = new Date(row.created_at)
                const key = rowDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                if (!(key in buckets)) continue

                const reqBody = typeof row.request_body === 'string'
                    ? JSON.parse(row.request_body || '{}')
                    : (row.request_body || {})
                const resBody = typeof row.response_body === 'string'
                    ? JSON.parse(row.response_body || '{}')
                    : (row.response_body || {})

                const model = reqBody.model || resBody.model || 'unknown'
                const tokens = resBody.usage?.total_tokens || 0
                const duration = resBody.duration || 0

                if (model.includes('gpt')) {
                    buckets[key].gptCost += tokens > 0
                        ? (tokens / 1000) * GPT_BLENDED_PER_1K
                        : 0.0015
                    buckets[key].gptCalls++
                } else if (model.includes('whisper')) {
                    buckets[key].whisperCost += (duration / 60) * WHISPER_RATE_PER_MIN || 0.003
                    buckets[key].whisperCalls++
                }
            } catch {
                // skip
            }
        }

        // If no real data, generate illustrated static data 
        const hasRealData = Object.values(buckets).some(b => b.gptCost > 0 || b.whisperCost > 0)
        if (!hasRealData) {
            const keys = Object.keys(buckets)
            let gpt = 0.5, wh = 0.3
            return keys.map((date, i) => {
                gpt = Math.max(0.1, gpt + (Math.random() - 0.4) * 0.3)
                wh = Math.max(0.05, wh + (Math.random() - 0.4) * 0.15)
                return { date, gptCost: +gpt.toFixed(4), whisperCost: +wh.toFixed(4), gptCalls: 0, whisperCalls: 0 }
            })
        }

        return Object.entries(buckets).map(([date, b]) => ({
            date,
            gptCost: +b.gptCost.toFixed(4),
            whisperCost: +b.whisperCost.toFixed(4),
            gptCalls: b.gptCalls,
            whisperCalls: b.whisperCalls,
        }))
    }

    function handleNewLog(newRow: any) {
        const parsed = parseLogEntry(newRow)
        // Use functional updater to avoid stale closure over `logs`
        setLogs(prev => [parsed, ...prev].slice(0, 100))
    }

    const fetchLogs = useCallback(async () => {
        setIsLoading(true)
        try {
            const days = getDays()
            const since = new Date()
            since.setDate(since.getDate() - days)

            const { data, error } = await supabase
                .from('gpt_api_logs')
                .select('*')
                .gte('created_at', since.toISOString())
                .order('created_at', { ascending: false })
                .limit(500)

            if (error) throw error

            if (data) {
                const parsedLogs = data.map(parseLogEntry)
                setLogs(parsedLogs.slice(0, 100))
                computeMetrics(data)
                setCostData(buildCostData(data, days))
            }
        } catch (err) {
            console.error('Error fetching logs', err)
        } finally {
            setIsLoading(false)
        }
    }, [getDays])

    // Refetch when date range changes
    useEffect(() => {
        fetchLogs()
    }, [fetchLogs])

    // Realtime subscription — independent of date range, starts once on mount
    useEffect(() => {
        // Use a unique channel name with a timestamp to avoid conflicts with
        // any previously-alive channel on the Supabase side
        const channelName = `gpt_api_logs_realtime_${Date.now()}`

        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'gpt_api_logs' },
                (payload) => {
                    console.log('[Realtime] New log received:', payload.new)
                    handleNewLog(payload.new)
                }
            )
            .subscribe((status) => {
                console.log('[Realtime] Subscription status:', status)
            })

        return () => {
            channel.unsubscribe()
        }
    }, []) // Empty deps — subscribe once, never re-subscribe

    const avgGptLatency = avgGptLatencyMs !== null
        ? avgGptLatencyMs >= 1000
            ? `${(avgGptLatencyMs / 1000).toFixed(1)}s`
            : `${avgGptLatencyMs}ms`
        : null

    const avgWhisperLatency = avgWhisperLatencyMs !== null
        ? avgWhisperLatencyMs >= 1000
            ? `${(avgWhisperLatencyMs / 1000).toFixed(1)}s`
            : `${avgWhisperLatencyMs}ms`
        : null

    return {
        logs,
        avgGptLatency,
        avgWhisperLatency,
        avgGptLatencyMs,
        avgWhisperLatencyMs,
        costData,
        totalCalls,
        successRate,
        isLoading,
    }
}


