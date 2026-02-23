'use client'

import Icon from '../Icon'
import useFcmToken from '@/hooks/useFcmToken'
import { useState, useRef } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/utils/firebase'



interface NotificationComposerProps {
  title: string;
  setTitle: (val: string) => void;
  body: string;
  setBody: (val: string) => void;
  image: string | null;
  setImage: (val: string | null) => void;
  onNotificationSent?: () => void;
}

import SuccessPopup from './SuccessPopup'

// ... existing imports ...

export default function NotificationComposer({
  title,
  setTitle,
  body,
  setBody,
  image,
  setImage,
  onNotificationSent
}: NotificationComposerProps) {
  const { token } = useFcmToken();
  const [uploading, setUploading] = useState(false);
  const [audience, setAudience] = useState<'all' | 'free' | 'premium' | 'test'>('all');
  const [scheduleMode, setScheduleMode] = useState<'now' | 'later'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // New state
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict Size Limit: 1MB (approx. 1048576 bytes)
    if (file.size > 1024 * 1024) {
      alert('File is too large! Please upload an image smaller than 1MB.');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `notifications/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImage(downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async () => {
    if (audience === 'test' && !token) {
      alert('No FCM token found. Allow notifications first to test.');
      return;
    }

    if (scheduleMode === 'later' && !scheduledDate) {
      alert('Please select a date and time for the scheduled campaign.');
      return;
    }

    try {
      const payload: any = {
        title: title || 'New Campaign',
        body: body,
        image: image, // Send the uploaded image URL
        scheduledFor: scheduleMode === 'later' ? new Date(scheduledDate).toISOString() : null
      };

      if (audience === 'all') {
        payload.topic = 'all_users';
      } else if (audience === 'test') {
        payload.token = token;
      } else {
        alert('This audience is not yet supported.');
        return;
      }

      const res = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setShowSuccess(true);
        if (onNotificationSent) onNotificationSent();
      } else {
        alert('Failed to send: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error sending notification');
    }
  };

  return (
    <>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Campaign Launched!"
        message="Your notification has been successfully queued for delivery."
      />

      <div className="bg-card-dark rounded-xl border border-border-dark/50 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-border-dark/50 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="edit_square" className="text-primary" />
            </div>
            <h3 className="text-white text-lg font-bold">New Campaign</h3>
          </div>
          {token && (
            <div className="hidden md:block max-w-[200px]">
              <p className="text-[10px] text-text-secondary truncate bg-black/20 p-1 rounded border border-white/5 select-all cursor-copy" title="Click to copy" onClick={() => navigator.clipboard.writeText(token)}>
                Token: {token}
              </p>
            </div>
          )}


          {/* Debug Token Display */}
          <div className="hidden md:flex items-center gap-2 max-w-xs">
            <span className="text-xs text-text-secondary truncate select-all font-mono bg-black/20 px-2 py-1 rounded border border-white/5">
              {/* We will inject token here via props or hook later if needed, for now just a placeholder or use the hook directly in this component if we want to show it. 
                   Actually, let's just leave it as 'New Campaign'.
                   Wait, I should probably use the hook here to show the token!
               */}
            </span>
          </div>

          <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">DRAFT</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Inputs Row */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">Campaign Title</label>
              <input
                className="w-full bg-input-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Summer AI Update 🚀"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">Notification Body</label>
              <div className="relative">
                <textarea
                  className="w-full bg-input-dark border border-border-dark rounded-lg px-4 py-3 pb-8 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[120px] resize-none"
                  placeholder="Write your compelling message here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />

                <span className="absolute bottom-3 right-3 text-xs text-text-secondary">0/140</span>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">Media Attachment (Optional)</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border-dark rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-white/[0.02] transition cursor-pointer group relative overflow-hidden"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-text-secondary text-xs">Uploading...</span>
                </div>
              ) : image ? (
                <div className="relative w-full h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">Click to Change</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-input-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="add_photo_alternate" className="text-text-secondary group-hover:text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-text-secondary text-xs mt-1">SVG, PNG, JPG (max. 1MB)</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px bg-border-dark/50 flex-1"></div>
              <span className="text-text-secondary text-xs font-medium uppercase">OR</span>
              <div className="h-px bg-border-dark/50 flex-1"></div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">Image URL</label>
              <input
                className="w-full bg-input-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="https://example.com/image.png"
                type="url"
                value={image || ''}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>


          <div className="h-px bg-border-dark/50 w-full my-2"></div>

          {/* Targeting & Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Targeting */}
            <div className="flex flex-col gap-3">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                Target Audience
                <Icon name="info" className="text-text-secondary" size={16} />
              </label>
              <div className="flex flex-col gap-2">
                <label className={`relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:border-primary/50 transition ${audience === 'all' ? 'border-primary bg-primary/10' : 'border-border-dark bg-input-dark'}`}>
                  <input
                    checked={audience === 'all'}
                    onChange={() => setAudience('all')}
                    className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0"
                    name="audience"
                    type="radio"
                  />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">All Users</span>
                    <span className="text-text-secondary text-xs">Approx. 24.5k recipients</span>
                  </div>
                </label>
                <label className={`relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:border-primary/50 transition ${audience === 'test' ? 'border-primary bg-primary/10' : 'border-border-dark bg-input-dark'}`}>
                  <input
                    checked={audience === 'test'}
                    onChange={() => setAudience('test')}
                    className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0"
                    name="audience"
                    type="radio"
                  />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">Test Device (You)</span>
                    <span className="text-text-secondary text-xs">Send only to this browser/device</span>
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="relative flex items-center gap-2 p-3 rounded-lg border border-border-dark bg-input-dark cursor-pointer hover:border-primary/50 transition opacity-60 hover:opacity-100">
                    <input className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="audience" type="radio" />
                    <span className="text-white text-sm font-medium">Free Tier</span>
                  </label>
                  <label className="relative flex items-center gap-2 p-3 rounded-lg border border-border-dark bg-input-dark cursor-pointer hover:border-primary/50 transition opacity-60 hover:opacity-100">
                    <input className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="audience" type="radio" />
                    <span className="text-white text-sm font-medium">Premium</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex flex-col gap-3">
              <label className="text-white text-sm font-medium">Delivery Schedule</label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setScheduleMode('now')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${scheduleMode === 'now' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-transparent border border-border-dark text-text-secondary hover:text-white hover:bg-white/5'}`}
                >
                  Send Now
                </button>
                <button
                  onClick={() => setScheduleMode('later')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${scheduleMode === 'later' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-transparent border border-border-dark text-text-secondary hover:text-white hover:bg-white/5'}`}
                >
                  Schedule
                </button>
              </div>
              <div className="relative">
                <input
                  className={`w-full bg-input-dark border border-border-dark rounded-lg px-4 py-3 text-text-secondary focus:ring-2 focus:ring-primary outline-none text-sm appearance-none ${scheduleMode === 'now' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={scheduleMode === 'now'}
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  type="datetime-local"
                />
                <Icon name="calendar_today" className="absolute right-3 top-3 text-text-secondary pointer-events-none" />
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {scheduleMode === 'now' ? 'Campaign will start immediately after approval.' : 'Campaign will be sent at the scheduled time.'}
              </p>
            </div>
          </div>

          {/* Main Actions */}
          <div className="flex justify-end pt-4 gap-3">
            <button className="px-6 py-3 rounded-lg border border-border-dark text-white font-medium hover:bg-white/5 transition">Save Draft</button>
            <button
              onClick={handleSend}
              className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold tracking-wide shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
              <Icon name="send" />
              Launch Campaign
            </button>

          </div>
        </div>
      </div>
    </>
  )
}
