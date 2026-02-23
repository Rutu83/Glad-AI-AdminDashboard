'use client'

const tabs = [
  { id: 'api', label: 'API Configuration', icon: '⚡' },
  { id: 'general', label: 'General Settings', icon: '⚙️' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'profile', label: 'Admin Profile', icon: '👤' },
]

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-[#302839] overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 px-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                ? 'border-primary text-white'
                : 'border-transparent text-text-secondary hover:text-white hover:border-white/20'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}