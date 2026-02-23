'use client'

import Icon from './Icon'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex-none h-16 md:h-20 px-4 pl-14 md:pl-8 md:px-8 flex items-center justify-between border-b border-white/5 bg-background-dark/50 backdrop-blur-sm z-10">
      <div className="flex items-center gap-4 min-w-0">
        <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight truncate">{title}</h2>
        {subtitle && (
          <span className="text-sm text-gray-400 hidden sm:block">• {subtitle}</span>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            className="h-10 w-64 bg-[#1e1926] border-none rounded-full pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:bg-[#251f30] transition-all"
            placeholder="Search system data..."
            type="text"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-gray-300">
          <Icon name="notifications" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#00f0ff]"></span>
        </button>
      </div>
    </header>
  )
}