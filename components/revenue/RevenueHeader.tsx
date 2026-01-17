import Icon from '../Icon'

export default function RevenueHeader() {
  return (
    <header className="flex-shrink-0 w-full bg-background-dark/95 backdrop-blur-md z-10 border-b border-white/5 sticky top-0">
      <div className="px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-3xl font-black tracking-tight">Revenue & Subscriptions</h2>
            <p className="text-text-secondary text-sm font-normal">Overview of financial performance and subscription metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-card-dark border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors">
              <Icon name="calendar_today" className="text-[18px]" />
              Last 30 Days
              <Icon name="expand_more" className="text-[18px]" />
            </button>
            <button className="flex items-center justify-center size-10 bg-primary rounded-lg text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors">
              <Icon name="download" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}