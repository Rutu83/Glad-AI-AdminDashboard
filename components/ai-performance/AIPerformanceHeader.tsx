interface AIPerformanceHeaderProps {
  totalCalls?: number
  successRate?: number
}

export default function AIPerformanceHeader({ totalCalls, successRate }: AIPerformanceHeaderProps) {
  return (
    <header className="flex-none px-4 md:px-8 py-4 md:py-6 z-10 pt-14 md:pt-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">AI Performance Monitor</h1>
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-sm">Real-time latency tracking and cost analysis</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">Live</span>
          </div>
        </div>
        {totalCalls !== undefined && (
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-text-secondary uppercase tracking-wider">Total API Calls</p>
              <p className="text-2xl font-bold text-white">{totalCalls.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary uppercase tracking-wider">Success Rate</p>
              <p className={`text-2xl font-bold ${successRate && successRate >= 95 ? 'text-accent-green' : successRate && successRate >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                {successRate ?? '--'}%
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}