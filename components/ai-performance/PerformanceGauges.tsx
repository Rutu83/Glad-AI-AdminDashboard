'use client'

import Icon from '../Icon'

interface PerformanceGaugesProps {
  avgGptLatency: string | null
  avgWhisperLatency: string | null
  isLoading: boolean
}

function GaugeLabel({ latency }: { latency: string | null }) {
  if (!latency) return <span className="inline-flex w-fit items-center rounded-md bg-white/5 px-2.5 py-1 text-sm font-medium text-text-secondary ring-1 ring-inset ring-white/10">No data</span>
  const ms = parseFloat(latency) * (latency.endsWith('s') && !latency.endsWith('ms') ? 1000 : 1)
  if (ms < 500) return <span className="inline-flex w-fit items-center rounded-md bg-accent-green/10 px-2.5 py-1 text-sm font-medium text-accent-green ring-1 ring-inset ring-accent-green/20">Excellent</span>
  if (ms < 1000) return <span className="inline-flex w-fit items-center rounded-md bg-accent-green/10 px-2.5 py-1 text-sm font-medium text-accent-green ring-1 ring-inset ring-accent-green/20">Fast</span>
  if (ms < 2000) return <span className="inline-flex w-fit items-center rounded-md bg-accent-green/10 px-2.5 py-1 text-sm font-medium text-accent-green ring-1 ring-inset ring-accent-green/20">Optimal</span>
  if (ms < 3000) return <span className="inline-flex w-fit items-center rounded-md bg-yellow-500/10 px-2.5 py-1 text-sm font-medium text-yellow-400 ring-1 ring-inset ring-yellow-500/20">Slow</span>
  return <span className="inline-flex w-fit items-center rounded-md bg-red-500/10 px-2.5 py-1 text-sm font-medium text-red-400 ring-1 ring-inset ring-red-500/20">Critical</span>
}

function calculateOffset(latency: string | null, maxMs: number, isLoading: boolean): number {
  if (isLoading || !latency) return 251.2
  const ms = parseFloat(latency) * (latency.endsWith('s') && !latency.endsWith('ms') ? 1000 : 1)
  const ratio = Math.min(ms / maxMs, 1)
  return 251.2 - 251.2 * ratio
}

export default function PerformanceGauges({ avgGptLatency, avgWhisperLatency, isLoading }: PerformanceGaugesProps) {
  const whisperOffset = calculateOffset(avgWhisperLatency, 3000, isLoading)
  const gptOffset = calculateOffset(avgGptLatency, 2000, isLoading)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gauge 1: Whisper */}
      <div className="relative flex items-center justify-between rounded-2xl border border-border-dark bg-card-dark p-6 shadow-lg overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex flex-col gap-2 z-10">
          <p className="text-text-secondary font-medium flex items-center gap-2">
            <Icon name="graphic_eq" className="text-xl" />
            Avg Whisper Latency
          </p>
          <p className="text-4xl font-bold text-white tracking-tight">
            {isLoading
              ? <span className="animate-pulse text-gray-500">--</span>
              : (avgWhisperLatency ?? <span className="text-2xl text-text-secondary">N/A</span>)
            }
          </p>
          {!isLoading && <GaugeLabel latency={avgWhisperLatency} />}
          {!isLoading && !avgWhisperLatency && (
            <p className="text-xs text-text-secondary">No Whisper calls in this period</p>
          )}
        </div>

        <div className="relative h-32 w-32 flex items-center justify-center flex-shrink-0">
          <svg className="h-full w-full -rotate-90 transform transition-all duration-1000 ease-out" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="40" stroke="#302839" strokeLinecap="round" strokeWidth="10" />
            <circle
              className="transition-all duration-1000 ease-out"
              cx="50" cy="50" fill="none" r="40"
              stroke={avgWhisperLatency ? "#0bda73" : "#302839"}
              strokeDasharray="251.2"
              strokeDashoffset={whisperOffset}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="check_circle" className="text-accent-green text-3xl drop-shadow-[0_0_8px_rgba(11,218,115,0.5)]" />
          </div>
        </div>
      </div>

      {/* Gauge 2: GPT Response */}
      <div className="relative flex items-center justify-between rounded-2xl border border-border-dark bg-card-dark p-6 shadow-lg overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex flex-col gap-2 z-10">
          <p className="text-text-secondary font-medium flex items-center gap-2">
            <Icon name="psychology" className="text-xl" />
            Avg GPT Response Time
          </p>
          <p className="text-4xl font-bold text-white tracking-tight">
            {isLoading
              ? <span className="animate-pulse text-gray-500">--</span>
              : (avgGptLatency ?? <span className="text-2xl text-text-secondary">N/A</span>)
            }
          </p>
          {!isLoading && <GaugeLabel latency={avgGptLatency} />}
          {!isLoading && !avgGptLatency && (
            <p className="text-xs text-text-secondary">No GPT calls in this period</p>
          )}
        </div>

        <div className="relative h-32 w-32 flex items-center justify-center flex-shrink-0">
          <svg className="h-full w-full -rotate-90 transform transition-all duration-1000 ease-out" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="40" stroke="#302839" strokeLinecap="round" strokeWidth="10" />
            <circle
              className="transition-all duration-1000 ease-out"
              cx="50" cy="50" fill="none" r="40"
              stroke={avgGptLatency ? "#7f0df2" : "#302839"}
              strokeDasharray="251.2"
              strokeDashoffset={gptOffset}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="bolt" className="text-primary text-3xl drop-shadow-[0_0_8px_rgba(127,13,242,0.6)]" />
          </div>
        </div>
      </div>
    </div>
  )
}