'use client'

import Sidebar from '@/components/Sidebar'
import SettingsHeader from '@/components/settings/SettingsHeader'
import SettingsTabs from '@/components/settings/SettingsTabs'
import SettingsContent from '@/components/settings/SettingsContent'
import PageShimmerWrapper from '@/components/PageShimmerWrapper'
import { Shimmer } from '@/components/Shimmer'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function SettingsSkeleton() {
  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3">
        <Shimmer className="h-8 w-48" />
        <Shimmer className="h-4 w-72" />
      </div>
      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b border-border-dark/50 pb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-28 rounded-lg" />
        ))}
      </div>
      {/* Content Skeleton */}
      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col gap-4">
            <Shimmer className="h-5 w-40" />
            <Shimmer className="h-4 w-full max-w-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Shimmer className="h-10 w-full rounded-lg" />
              <Shimmer className="h-10 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('api')

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('app_settings').select('*').limit(1).single()
        if (data) setSettings(data)
        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching settings:", error)
        }
      } catch (e) {
        console.error("Fetch settings error", e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSaveClick = () => {
    if (typeof window !== 'undefined') {
      const form = document.getElementById('settings-form') as HTMLFormElement
      if (form) form.requestSubmit()
    }
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 h-full overflow-hidden bg-background-dark relative flex flex-col">
        <PageShimmerWrapper fallback={<SettingsSkeleton />} delay={300} isLoading={isLoading}>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
              <SettingsHeader />
              <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
              {settings && <SettingsContent initialSettings={settings} activeTab={activeTab} onSavingChange={setIsSaving} />}
              {!settings && !isLoading && (
                <div className="text-gray-400 p-8 text-center bg-white/5 rounded-xl border border-white/10">
                  Please run the generated SQL script to create the app_settings table in Supabase.
                </div>
              )}
            </div>
          </div>
        </PageShimmerWrapper>

        {/* Action Footer — hidden on Profile tab (it has its own save) and Security tab */}
        {activeTab !== 'profile' && activeTab !== 'security' && (
          <div className="w-full bg-[#191022]/80 backdrop-blur-md border-t border-[#302839] p-4 flex justify-end items-center px-10 gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg text-text-secondary font-medium hover:text-white transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isSaving || !settings}
              className="px-8 py-2.5 rounded-lg bg-primary hover:bg-[#6a0bcc] text-white font-semibold shadow-[0_0_15px_rgba(127,13,242,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}