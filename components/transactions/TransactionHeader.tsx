'use client'

import Icon from '../Icon'

interface TransactionHeaderProps {
  isRealTime: boolean
  setIsRealTime: (value: boolean) => void
}

export default function TransactionHeader({ isRealTime, setIsRealTime }: TransactionHeaderProps) {

  return (
    <header className="px-4 md:px-8 py-4 md:py-8 flex flex-col gap-4 md:gap-6 z-10 shrink-0 pt-14 md:pt-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <a className="text-text-secondary hover:text-primary transition-colors" href="#">Dashboard</a>
        <span className="text-text-secondary">/</span>
        <span className="text-white font-medium">Transaction Logs</span>
      </div>

      {/* Page Title */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Live Transaction Feed</h2>
          <p className="text-text-secondary text-sm">Monitor incoming transactions and system events in real-time.</p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-4 bg-card-dark border border-border-dark p-2 rounded-xl shadow-lg overflow-x-auto">
          {/* Date Range */}
          <div className="flex items-center border-r border-border-dark pr-4 pl-2 h-10">
            <Icon name="calendar_today" className="text-text-secondary mr-2" size={20} />
            <input
              className="bg-transparent border-none text-sm text-white placeholder-text-secondary focus:ring-0 w-48 font-medium"
              type="text"
              defaultValue="Oct 24, 2023 - Oct 25, 2023"
            />
            <Icon name="expand_more" className="text-text-secondary" size={16} />
          </div>

          {/* Status Filter */}
          <div className="flex items-center border-r border-border-dark pr-4 pl-2 h-10">
            <span className="text-text-secondary text-sm mr-2 font-medium">Status:</span>
            <select className="bg-transparent border-none text-sm text-white focus:ring-0 py-0 pl-0 pr-8 cursor-pointer font-medium">
              <option>All Transactions</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          {/* Real-time Toggle */}
          <div className="flex items-center gap-3 pl-2 pr-2">
            <span className="text-sm font-medium text-white">Real-time</span>
            <label className="flex items-center cursor-pointer relative" htmlFor="realtime-toggle">
              <input
                checked={isRealTime}
                onChange={(e) => setIsRealTime(e.target.checked)}
                className="sr-only peer"
                id="realtime-toggle"
                type="checkbox"
              />
              <div className="w-11 h-6 bg-[#302839] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-900/50 peer-checked:after:bg-green-400 peer-checked:shadow-neon-green"></div>
            </label>
            {/* Pulsing Dot */}
            {isRealTime && (
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}