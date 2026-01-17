'use client'

import { useState } from 'react'
import Icon from '../Icon'

export default function SettingsContent() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted')
  }
  return (
    <form className="flex flex-col gap-10 pb-24" onSubmit={handleSubmit}>
      {/* Section: API Configuration */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="api" className="text-primary" />
          <h3 className="text-xl font-bold text-white">External Integrations</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OpenAI Key */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">OpenAI API Key</label>
            <div className="relative group">
              <Icon name="key" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5a7c]" />
              <input 
                className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-12 pl-12 pr-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-[#473b54]" 
                type="password" 
                defaultValue="sk-........................"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b5a7c] hover:text-white">
                <Icon name="visibility_off" />
              </button>
            </div>
            <p className="text-xs text-[#6b5a7c]">Used for the core conversational engine.</p>
          </div>

          {/* Cloud Storage */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Cloud Storage Bucket URL</label>
            <div className="relative group">
              <Icon name="cloud_queue" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5a7c]" />
              <input 
                className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-12 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-[#473b54]" 
                type="text" 
                defaultValue="s3://glad-ai-production-assets"
              />
            </div>
            <p className="text-xs text-[#6b5a7c]">Destination for user-generated content logs.</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#302839] w-full"></div>

      {/* Section: General System */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Icon name="tune" className="text-primary" />
          <h3 className="text-xl font-bold text-white">General Preferences</h3>
        </div>
        <div className="bg-[#211b27] border border-[#302839] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-white font-medium text-lg">Maintenance Mode</p>
            <p className="text-text-secondary text-sm">Temporarily disable access for non-admin users. Useful for updates.</p>
          </div>
          {/* Toggle Switch */}
          <label className="inline-flex items-center cursor-pointer">
            <input 
              className="sr-only peer" 
              type="checkbox" 
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
            />
            <div className="relative w-14 h-7 bg-[#302839] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="h-px bg-[#302839] w-full"></div>

      {/* Section: Security */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Icon name="security" className="text-primary" />
          <h3 className="text-xl font-bold text-white">Security & Access</h3>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {/* 2FA Toggle Card */}
          <div className="bg-[#211b27] border border-[#302839] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-white font-medium text-lg">Two-Factor Authentication (2FA)</p>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</span>
              </div>
              <p className="text-text-secondary text-sm">Require a verification code each time an admin logs in.</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                className="sr-only peer" 
                type="checkbox" 
              />
              <div className="relative w-14 h-7 bg-[#302839] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Change Password */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-white font-medium">Change Admin Password</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-semibold text-[#6b5a7c] uppercase">Current Password</label>
                <input 
                  className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-10 px-4 text-white focus:border-primary focus:ring-0" 
                  placeholder="••••••••••••" 
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#6b5a7c] uppercase">New Password</label>
                <input 
                  className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-10 px-4 text-white focus:border-primary focus:ring-0" 
                  placeholder="••••••••••••" 
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#6b5a7c] uppercase">Confirm Password</label>
                <input 
                  className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-10 px-4 text-white focus:border-primary focus:ring-0" 
                  placeholder="••••••••••••" 
                  type="password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}