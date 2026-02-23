export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart: AI Accuracy */}
      <div className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">AI Model Accuracy Trend</h3>
            <p className="text-sm text-gray-400">Weekly performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary neon-text">98.5%</span>
            <span className="text-sm text-emerald-400 font-medium">↑ 1.2%</span>
          </div>
        </div>

        {/* SVG Chart Area */}
        <div className="flex-1 min-h-[250px] w-full relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-600">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-white/5 w-full h-0"></div>
            ))}
          </div>

          {/* Chart SVG */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7f0df2" stopOpacity="0.5"></stop>
                <stop offset="100%" stopColor="#7f0df2" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path 
              d="M0,50 L0,35 C10,35 10,25 20,28 C30,31 30,20 40,18 C50,16 50,25 60,22 C70,19 70,10 80,8 C90,6 90,12 100,5 L100,50 Z" 
              fill="url(#chartGradient)"
            />
            {/* Line Stroke */}
            <path 
              d="M0,35 C10,35 10,25 20,28 C30,31 30,20 40,18 C50,16 50,25 60,22 C70,19 70,10 80,8 C90,6 90,12 100,5" 
              fill="none" 
              stroke="#7f0df2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="0.8" 
              style={{ filter: 'drop-shadow(0 0 4px rgba(127,13,242,0.6))' }}
            />
            {/* Data Points */}
            <circle cx="20" cy="28" fill="#fff" r="1"></circle>
            <circle cx="40" cy="18" fill="#fff" r="1"></circle>
            <circle cx="60" cy="22" fill="#fff" r="1"></circle>
            <circle cx="80" cy="8" fill="#fff" r="1"></circle>
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>

      {/* Secondary Chart: Circular Gauge */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative">
        <h3 className="text-lg font-bold text-white w-full text-left mb-2">System Health</h3>
        <p className="text-sm text-gray-400 w-full text-left mb-6">Uptime Monitor</p>
        
        <div className="relative h-48 w-48 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
            <path 
              className="text-white/5" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
            />
            {/* Value Circle (96%) */}
            <path 
              className="text-accent-cyan" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeDasharray="96, 100" 
              strokeLinecap="round" 
              strokeWidth="3" 
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,240,255,0.6))' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-white">96%</span>
            <span className="text-xs text-accent-cyan font-medium uppercase tracking-wider">Uptime</span>
          </div>
        </div>

        <div className="w-full mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 rounded-lg py-2 border border-white/5">
            <p className="text-xs text-gray-400">Latency</p>
            <p className="text-sm font-bold text-white">24ms</p>
          </div>
          <div className="bg-white/5 rounded-lg py-2 border border-white/5">
            <p className="text-xs text-gray-400">Errors</p>
            <p className="text-sm font-bold text-emerald-400">0%</p>
          </div>
        </div>
      </div>
    </div>
  )
}