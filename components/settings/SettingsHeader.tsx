import Icon from '../Icon'

export default function SettingsHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
        <span>Home</span>
        <Icon name="chevron_right" size={12} />
        <span className="text-white">System Settings</span>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">System Settings</h2>
          <p className="text-text-secondary max-w-2xl">Manage system configurations, API integrations, and security protocols for the GLAD AI platform.</p>
        </div>
        <div className="hidden md:block">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-primary/20 flex items-center justify-center text-xs text-white" title="Admin Active">AM</div>
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-green-500/20 flex items-center justify-center text-xs text-green-400" title="System Status: Healthy">
              <Icon name="check_circle" size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}