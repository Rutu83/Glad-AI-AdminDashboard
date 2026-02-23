'use client'

import Sidebar from '@/components/Sidebar'
import NotificationComposer from '@/components/notifications/NotificationComposer'
import CampaignHistory from '@/components/notifications/CampaignHistory'
import MobilePreview from '@/components/notifications/MobilePreview'
import { useState, useEffect } from 'react'


export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNotificationSent = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Poll the scheduler endpoint every 60 seconds to process scheduled notifications
  useEffect(() => {
    const processScheduled = async () => {
      try {
        await fetch('/api/notifications/process-scheduled', { method: 'POST' });
      } catch (err) {
        console.error('Scheduler poll failed:', err);
      }
    };

    // Run immediately on mount
    processScheduled();

    const interval = setInterval(processScheduled, 60_000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        {/* Mobile Header (Visible only on small screens) - REMOVED (Sidebar handles this) */}
        <div className="lg:hidden h-16"></div> {/* Spacer for fixed button */}

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
                <NotificationComposer
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                  image={image}
                  setImage={setImage}
                  onNotificationSent={handleNotificationSent}
                />
                <CampaignHistory refreshTrigger={refreshTrigger} />
              </div>

              {/* Right Column: Mobile Preview (4 cols) */}
              <div className="xl:col-span-4">
                <MobilePreview title={title} body={body} image={image} />


              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}