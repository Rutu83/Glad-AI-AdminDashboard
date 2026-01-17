'use client'

import { useEffect, useState } from 'react'
import Icon from '../Icon'

interface LogEntry {
  timestamp: string
  type: 'INFO' | 'SUCCESS' | 'ERROR'
  message: string
  model?: string
  status?: number
  latency?: string
  tokens?: number
  cost?: string
  duration?: string
  error?: string
}

const initialLogs: LogEntry[] = [
  { timestamp: '14:02:18', type: 'INFO', message: 'Initializing stream connection...' },
  { timestamp: '14:02:19', type: 'SUCCESS', message: 'Connected to wss://api.glad.ai/v1/stream' },
  { timestamp: '14:02:21', type: 'INFO', message: '{ "model": "gpt-4", "status": 200, "latency": "820ms", "tokens": 450, "cost": "$0.0135" }', model: 'gpt-4', status: 200, latency: '820ms', tokens: 450, cost: '$0.0135' },
  { timestamp: '14:02:23', type: 'INFO', message: '{ "model": "whisper-1", "status": 200, "latency": "1100ms", "duration": "12.4s", "cost": "$0.006" }', model: 'whisper-1', status: 200, latency: '1100ms', duration: '12.4s', cost: '$0.006' },
  { timestamp: '14:02:24', type: 'INFO', message: '{ "model": "gpt-4", "status": 200, "latency": "650ms", "tokens": 120, "cost": "$0.0036" }', model: 'gpt-4', status: 200, latency: '650ms', tokens: 120, cost: '$0.0036' },
  { timestamp: '14:02:28', type: 'INFO', message: '{ "model": "gpt-3.5-turbo", "status": 200, "latency": "320ms", "tokens": 890, "cost": "$0.0018" }', model: 'gpt-3.5-turbo', status: 200, latency: '320ms', tokens: 890, cost: '$0.0018' },
  { timestamp: '14:02:30', type: 'INFO', message: '{ "model": "whisper-1", "status": 200, "latency": "980ms", "duration": "8.2s", "cost": "$0.0041" }', model: 'whisper-1', status: 200, latency: '980ms', duration: '8.2s', cost: '$0.0041' },
  { timestamp: '14:02:35', type: 'ERROR', message: '{ "model": "gpt-4", "status": 429, "error": "Rate limit exceeded", "retry_after": "2s" }', model: 'gpt-4', status: 429, error: 'Rate limit exceeded' },
  { timestamp: '14:02:37', type: 'INFO', message: '{ "model": "gpt-4", "status": 200, "latency": "1400ms", "tokens": 1500, "cost": "$0.0450" }', model: 'gpt-4', status: 200, latency: '1400ms', tokens: 1500, cost: '$0.0450' }
]

function formatLogMessage(log: LogEntry) {
  if (log.model) {
    const modelColor = log.model.includes('gpt') ? 'text-primary' : 'text-accent-green'
    const statusColor = log.status === 200 ? 'text-green-400' : 'text-red-400'
    
    return (
      <span className="text-[#a6accd]">
        {`{ "model": "`}<span className={modelColor}>{log.model}</span>{`", "status": `}
        <span className={statusColor}>{log.status}</span>
        {log.latency && `, "latency": "${log.latency}"`}
        {log.tokens && `, "tokens": ${log.tokens}`}
        {log.duration && `, "duration": "${log.duration}"`}
        {log.cost && `, "cost": "${log.cost}"`}
        {log.error && `, "error": "${log.error}"`}
        {` }`}
      </span>
    )
  }
  
  return <span>{log.message}</span>
}

export default function LiveTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 1000)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="flex flex-col rounded-2xl border border-border-dark bg-[#0d0a12] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#302839] bg-[#141118] px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon name="terminal" className="text-primary animate-pulse text-base" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">Live API Stream</h3>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
        </div>
      </div>
      
      <div className="font-mono text-xs md:text-sm p-4 h-64 overflow-y-auto terminal-scroll text-[#e5e7eb] flex flex-col gap-1">
        {logs.map((log, index) => {
          if (index < 3) {
            return (
              <div key={index} className={`flex gap-3 ${index === 0 ? 'opacity-50' : 'opacity-60'}`}>
                <span className="text-text-secondary">{log.timestamp}</span>
                <span className={log.type === 'SUCCESS' ? 'text-green-400' : 'text-blue-400'}>{log.type}</span>
                <span>{log.message}</span>
              </div>
            )
          }
          
          if (index === 3) {
            return <div key={index} className="my-1 border-t border-[#302839]/50"></div>
          }
          
          return (
            <div key={index} className="flex gap-2">
              <span className="text-text-secondary shrink-0">{log.timestamp}</span>
              {formatLogMessage(log)}
            </div>
          )
        })}
        
        {/* Blinking Cursor */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-primary">➜</span>
          <span className={`h-4 w-2 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
        </div>
      </div>
    </div>
  )
}