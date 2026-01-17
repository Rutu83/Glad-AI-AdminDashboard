import Icon from '../Icon'

export default function CostChart() {
  return (
    <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Daily API Cost Breakdown</h2>
          <p className="text-sm text-text-secondary">GPT-4 vs Whisper-v2 usage costs (Last 30 Days)</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgba(127,13,242,0.6)]"></span>
            <span className="text-sm font-medium text-white">GPT-4</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent-green shadow-[0_0_8px_rgba(11,218,115,0.6)]"></span>
            <span className="text-sm font-medium text-white">Whisper-v2</span>
          </div>
          <button className="ml-2 flex items-center gap-2 rounded-lg bg-[#302839] px-3 py-1.5 text-sm font-medium text-white hover:bg-border-dark transition-colors">
            <span>Last 30 Days</span>
            <Icon name="expand_more" className="text-sm" />
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="relative h-64 w-full">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-border-dark">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-[#302839]/50 w-full"></div>
          ))}
        </div>

        {/* SVG Chart */}
        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
          <defs>
            <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7f0df2" stopOpacity="0.3"></stop>
              <stop offset="100%" stopColor="#7f0df2" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient id="gradientSecondary" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0bda73" stopOpacity="0.3"></stop>
              <stop offset="100%" stopColor="#0bda73" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          
          {/* Whisper Line (Secondary) */}
          <path d="M0 150 Q 100 160, 200 130 T 400 140 T 600 110 T 800 130 T 1000 100 V 200 H 0 Z" fill="url(#gradientSecondary)"></path>
          <path 
            className="drop-shadow-[0_0_4px_rgba(11,218,115,0.4)]" 
            d="M0 150 Q 100 160, 200 130 T 400 140 T 600 110 T 800 130 T 1000 100" 
            fill="none" 
            stroke="#0bda73" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3"
          />
          
          {/* GPT Line (Primary) */}
          <path d="M0 100 Q 150 80, 300 110 T 500 60 T 700 80 T 900 40 T 1000 20 V 200 H 0 Z" fill="url(#gradientPrimary)"></path>
          <path 
            className="drop-shadow-[0_0_6px_rgba(127,13,242,0.5)]" 
            d="M0 100 Q 150 80, 300 110 T 500 60 T 700 80 T 900 40 T 1000 20" 
            fill="none" 
            stroke="#7f0df2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div className="mt-2 flex justify-between px-2 text-xs font-medium text-text-secondary">
        {['Jun 1', 'Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jun 30'].map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
    </div>
  )
}