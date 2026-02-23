'use client'

import { useEffect, useState } from 'react'
import Icon from '../Icon'
import { LogEntry } from '@/hooks/useAILogs'

interface LiveTerminalProps {
  logs: LogEntry[]
  isLoading: boolean
}

function formatLogMessage(log: LogEntry) {
  if (log.model && log.model !== 'unknown') {
    const modelColor = log.model.includes('gpt') ? 'text-primary' : 'text-accent-green'
    const statusColor = log.status === 200 ? 'text-green-400' : 'text-red-400'

    return (
      <span className="text-[#a6accd]">
        {`{ "model": "`}<span className={modelColor}>{log.model}</span>{`", "status": `}
        <span className={statusColor}>{log.status}</span>
        {log.latency && `, "latency": "${log.latency}"`}
        {log.tokens !== undefined && `, "tokens": ${log.tokens}`}
        {log.duration && `, "duration": "${log.duration}"`}
        {log.cost && `, "cost": "${log.cost}"`}
        {log.error && `, "error": "${log.error}"`}
        {` }`}
      </span>
    )
  }

  return <span>{log.message}</span>
}

export default function LiveTerminal({ logs, isLoading }: LiveTerminalProps) {
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
        <div className="flex gap-1.5 items-center">
          {isLoading && <span className="text-xs text-text-secondary mr-2 animate-pulse">Connecting...</span>}
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
        </div>
      </div>

      <div className="font-mono text-xs md:text-sm p-4 h-64 overflow-y-auto terminal-scroll text-[#e5e7eb] flex flex-col gap-1">
        {logs.length === 0 && !isLoading ? (
          <div className="text-text-secondary flex gap-2">
            <span className="text-primary">➜</span> Waiting for API activity...
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-text-secondary shrink-0">{log.timestamp}</span>
              {formatLogMessage(log)}
            </div>
          ))
        )}

        {/* Blinking Cursor */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-primary">➜</span>
          <span className={`h-4 w-2 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
        </div>
      </div>
    </div>
  )
}