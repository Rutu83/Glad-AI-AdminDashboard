import Icon from '../Icon'

export default function PerformanceGauges() {
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
          <p className="text-4xl font-bold text-white tracking-tight">1.2s</p>
          <span className="inline-flex w-fit items-center rounded-md bg-accent-green/10 px-2.5 py-1 text-sm font-medium text-accent-green ring-1 ring-inset ring-accent-green/20">
            Optimal
          </span>
        </div>
        
        {/* SVG Gauge Visualization */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle cx="50" cy="50" fill="none" r="40" stroke="#302839" strokeLinecap="round" strokeWidth="10"></circle>
            {/* Progress Arc */}
            <circle 
              className="gauge-animation" 
              cx="50" 
              cy="50" 
              fill="none" 
              r="40" 
              stroke="#0bda73" 
              strokeDasharray="251.2" 
              strokeDashoffset="60" 
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
          <p className="text-4xl font-bold text-white tracking-tight">0.8s</p>
          <span className="inline-flex w-fit items-center rounded-md bg-primary/20 px-2.5 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/40 shadow-[0_0_10px_rgba(127,13,242,0.2)]">
            Fast
          </span>
        </div>
        
        {/* SVG Gauge Visualization */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle cx="50" cy="50" fill="none" r="40" stroke="#302839" strokeLinecap="round" strokeWidth="10"></circle>
            {/* Progress Arc */}
            <circle 
              className="gauge-animation" 
              cx="50" 
              cy="50" 
              fill="none" 
              r="40" 
              stroke="#7f0df2" 
              strokeDasharray="251.2" 
              strokeDashoffset="30" 
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