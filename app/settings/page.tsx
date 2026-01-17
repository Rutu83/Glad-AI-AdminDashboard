'use client'

import Sidebar from '@/components/Sidebar'
import SettingsHeader from '@/components/settings/SettingsHeader'
import SettingsTabs from '@/components/settings/SettingsTabs'
import SettingsContent from '@/components/settings/SettingsContent'

export default function SettingsPage() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 h-full overflow-y-auto bg-background-dark relative flex flex-col">
        <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
          <SettingsHeader />
          <SettingsTabs />
          <SettingsContent />
        </div>
        
        {/* Floating Action Footer */}
        <div className="sticky bottom-0 w-full bg-[#191022]/80 backdrop-blur-md border-t border-[#302839] p-4 z-10 flex justify-end items-center px-10 gap-4">
          <button 
            onClick={() => console.log('Cancel clicked')}
            className="px-6 py-2.5 rounded-lg text-text-secondary font-medium hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => console.log('Save changes clicked')}
            className="px-8 py-2.5 rounded-lg bg-primary hover:bg-[#6a0bcc] text-white font-semibold shadow-[0_0_15px_rgba(127,13,242,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  )
}