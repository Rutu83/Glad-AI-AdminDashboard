'use client'

import { useState, useEffect } from 'react'
import Icon from '../Icon'

interface MobilePreviewProps {
  title: string;
  body: string;
  image?: string | null;
}

export default function MobilePreview({ title, body, image }: MobilePreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format times
  const formatStatusBarTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(/ AM| PM/, '');
  };

  const formatLockScreenTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(/ AM| PM/, '');
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Prevent hydration mismatch by showing a default or empty state until mounted
  // typically better to show nothing or a specific placeholder, but hardcoded 9:41 is fine for server render if we accept the jump.
  // logic below handles it by using standard date until effect runs? No, date is new Date() on init.
  // On server new Date() is server time. On client it's client time. Mismatch possible.
  // We'll use the 'mounted' check to render the client time, otherwise fall back to 9:41 to match server/snapshot?
  // Actually, let's just use the client time and suppress hydration warning if needed, but since we are 'use client', purely client side rendering for the time part is safer if we wrap in useEffect, but that delays render.
  // Let's stick to rendering immediately but accept that server might differ.
  // Since this is a preview component likely under a client component root, it might be fine.

  return (
    <div className="sticky top-8">
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-text-secondary text-sm uppercase tracking-widest font-bold">Live Preview</h3>

        {/* Phone Frame */}
        <div className="relative w-[300px] h-[600px] bg-[#0f0c13] rounded-[3rem] border-8 border-[#2d2436] shadow-2xl overflow-hidden select-none">
          {/* Notch/Dynamic Island */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-[#2d2436] rounded-b-xl z-20"></div>

          {/* Screen Content */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
            {/* Status Bar */}
            <div className="w-full h-12 flex justify-between items-center px-6 pt-2 text-white text-xs font-medium z-10 relative">
              <span>{mounted ? formatStatusBarTime(date) : '9:41'}</span>
              <div className="flex gap-1.5">
                <Icon name="signal_cellular_alt" size={14} />
                <Icon name="wifi" size={14} />
                <Icon name="battery_full" size={14} />
              </div>
            </div>

            {/* Date Time Lock Screen */}
            <div className="flex flex-col items-center mt-8 text-white drop-shadow-md">
              <div className="text-6xl font-thin tracking-tighter">
                {mounted ? formatLockScreenTime(date) : '09:41'}
              </div>
              <div className="text-lg font-medium">
                {mounted ? formatDate(date) : 'Tuesday, October 24'}
              </div>
            </div>

            {/* Notification Card */}
            <div className="mt-8 mx-3">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/20 overflow-hidden animate-pulse-slow">
                <div className="flex gap-3 mb-2">
                  <div className="h-5 w-5 rounded bg-black flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-tr from-primary to-purple-400"></div>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-xs font-bold text-white/90 uppercase tracking-wide">GLAD AI</span>
                    <span className="text-[10px] text-white/70">now</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-white leading-tight">{title || 'Campaign Title'}</p>
                  <p className="text-xs text-white/90 leading-snug">{body || 'Notification body text will appear here...'}</p>
                  {image && (
                    <div className="mt-2 rounded-lg overflow-hidden w-full aspect-video relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image} alt="Notification Media" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Bottom Actions */}
            <div className="absolute bottom-6 w-full flex justify-between px-10">
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <Icon name="flashlight_on" className="text-white" size={20} />
              </div>
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <Icon name="photo_camera" className="text-white" size={20} />
              </div>
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="text-center text-xs text-text-secondary max-w-[250px]">
          <p>Preview shows how the notification will appear on an iOS Lock Screen.</p>
        </div>
      </div>
    </div>
  )
}
