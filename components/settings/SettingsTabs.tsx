'use client'

import { useState } from 'react'

const tabs = [
  { id: 'api', label: 'API Configuration' },
  { id: 'general', label: 'General Settings' },
  { id: 'security', label: 'Security' },
  { id: 'profile', label: 'Admin Profile' }
]

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('api')

  return (
    <div className="border-b border-[#302839]">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-white'
                : 'border-transparent text-text-secondary hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}