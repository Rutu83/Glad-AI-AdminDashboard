'use client'

import Icon from '../Icon'

export default function NotificationComposer() {
  return (
    <div className="bg-card-dark rounded-xl border border-border-dark/50 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-border-dark/50 flex justify-between items-center bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="edit_square" className="text-primary" />
          </div>
          <h3 className="text-white text-lg font-bold">New Campaign</h3>
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">Notification Body</label>
            <div className="relative">
              <textarea 
                className="w-full bg-input-dark border border-border-dark rounded-lg px-4 py-3 pb-8 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[120px] resize-none" 
                placeholder="Write your compelling message here..."
              />
              <span className="absolute bottom-3 right-3 text-xs text-text-secondary">0/140</span>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Media Attachment (Optional)</label>
          <div className="border-2 border-dashed border-border-dark rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-white/[0.02] transition cursor-pointer group">
            <div className="h-12 w-12 rounded-full bg-input-dark flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="add_photo_alternate" className="text-text-secondary group-hover:text-primary" />
            </div>
            <div className="text-center">
              <p className="text-white text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-text-secondary text-xs mt-1">SVG, PNG, JPG (max. 800x400px)</p>
            </div>
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
              <label className="relative flex items-center gap-3 p-3 rounded-lg border border-border-dark bg-input-dark cursor-pointer hover:border-primary/50 transition">
                <input 
                  defaultChecked 
                  className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" 
                  name="audience" 
                  type="radio"
                />
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">All Users</span>
                  <span className="text-text-secondary text-xs">Approx. 24.5k recipients</span>
                </div>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="relative flex items-center gap-2 p-3 rounded-lg border border-border-dark bg-input-dark cursor-pointer hover:border-primary/50 transition opacity-60 hover:opacity-100">
                  <input className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="audience" type="radio"/>
                  <span className="text-white text-sm font-medium">Free Tier</span>
                </label>
                <label className="relative flex items-center gap-2 p-3 rounded-lg border border-border-dark bg-input-dark cursor-pointer hover:border-primary/50 transition opacity-60 hover:opacity-100">
                  <input className="w-4 h-4 text-primary bg-transparent border-gray-500 focus:ring-primary focus:ring-offset-0" name="audience" type="radio"/>
                  <span className="text-white text-sm font-medium">Premium</span>
                </label>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex flex-col gap-3">
            <label className="text-white text-sm font-medium">Delivery Schedule</label>
            <div className="flex gap-2 mb-2">
              <button className="flex-1 py-2 px-3 rounded-md bg-primary text-white text-sm font-medium shadow-lg shadow-primary/25">Send Now</button>
              <button className="flex-1 py-2 px-3 rounded-md bg-transparent border border-border-dark text-text-secondary hover:text-white text-sm font-medium hover:bg-white/5 transition">Schedule</button>
            </div>
            <div className="relative">
              <input 
                className="w-full bg-input-dark border border-border-dark rounded-lg px-4 py-3 text-text-secondary focus:ring-2 focus:ring-primary outline-none text-sm appearance-none" 
                disabled 
                type="datetime-local"
              />
              <Icon name="calendar_today" className="absolute right-3 top-3 text-text-secondary pointer-events-none" />
            </div>
            <p className="text-xs text-text-secondary mt-1">Campaign will start immediately after approval.</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex justify-end pt-4 gap-3">
          <button className="px-6 py-3 rounded-lg border border-border-dark text-white font-medium hover:bg-white/5 transition">Save Draft</button>
          <button className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold tracking-wide shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
            <Icon name="send" />
            Launch Campaign
          </button>
        </div>
      </div>
    </div>
  )
}