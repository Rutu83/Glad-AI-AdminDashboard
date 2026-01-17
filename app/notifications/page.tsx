import Sidebar from '@/components/Sidebar'
import NotificationComposer from '@/components/notifications/NotificationComposer'
import CampaignHistory from '@/components/notifications/CampaignHistory'
import MobilePreview from '@/components/notifications/MobilePreview'

export default function NotificationsPage() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        {/* Mobile Header (Visible only on small screens) */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border-dark bg-[#141118]">
          <div className="flex items-center gap-2">
            <span className="text-primary">🚀</span>
            <span className="font-bold text-white">GLAD AI</span>
          </div>
          <button className="text-white">☰</button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-24">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-3xl md:text-4xl font-black tracking-tight">Marketing & Notifications</h2>
                <p className="text-text-secondary text-base">Manage push campaigns, target users, and analyze engagement.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card-dark border border-border-dark text-white hover:bg-white/5 transition">
                  📋 <span className="text-sm font-medium">Archived</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-transparent text-white hover:bg-white/10 transition">
                  ❓ <span className="text-sm font-medium">Help Guide</span>
                </button>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Left Column: Composer & History (8 cols) */}
              <div className="xl:col-span-8 flex flex-col gap-8">
                <NotificationComposer />
                <CampaignHistory />
              </div>

              {/* Right Column: Mobile Preview (4 cols) */}
              <div className="xl:col-span-4">
                <MobilePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}