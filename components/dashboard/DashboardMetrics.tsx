import Icon from '../Icon'

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
  iconColor: string
}

function MetricCard({ title, value, change, changeType, icon, iconColor }: MetricCardProps) {
  const changeColors = {
    positive: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    negative: 'text-red-400 bg-red-400/10 border-red-400/20',
    neutral: 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 group hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-lg ${iconColor} group-hover:scale-110 transition-transform`}>
          <Icon name={icon} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${changeColors[changeType]}`}>
          <Icon
            name={changeType === 'positive' ? 'trending_up' : changeType === 'negative' ? 'trending_down' : 'remove'}
            size={14}
          />
          {change}
        </span>
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  )
}

export default function DashboardMetrics() {
  const metrics = [
    {
      title: 'Total Users',
      value: '12,450',
      change: '+5%',
      changeType: 'positive' as const,
      icon: 'group',
      iconColor: 'bg-primary/10 text-primary'
    },
    {
      title: 'Daily Revenue',
      value: '$3,240',
      change: '+12%',
      changeType: 'positive' as const,
      icon: 'attach_money',
      iconColor: 'bg-accent-cyan/10 text-accent-cyan'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}