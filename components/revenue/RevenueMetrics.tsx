import Icon from '../Icon'

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: string
  iconColor: string
}

function MetricCard({ title, value, change, changeType, icon, iconColor }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6 bg-card-dark border border-white/5 shadow-xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
        <Icon name={icon} className={`text-6xl ${iconColor.split(' ')[1]}`} />
      </div>
      <p className="text-text-secondary text-sm font-medium z-10">{title}</p>
      <div className="flex items-baseline gap-2 z-10">
        <h3 className="text-white text-3xl font-bold tracking-tight">{value}</h3>
      </div>
      <div className="flex items-center gap-1.5 z-10">
        <div className={`${changeType === 'positive' ? 'bg-emerald-500/20' : 'bg-red-500/20'} rounded-full p-0.5`}>
          <Icon 
            name={changeType === 'positive' ? 'trending_up' : 'trending_down'} 
            className={`${changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'} text-sm`} 
          />
        </div>
        <p className={`${changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'} text-sm font-medium`}>{change}</p>
        <span className="text-text-secondary text-xs">vs last month</span>
      </div>
    </div>
  )
}

export default function RevenueMetrics() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$1.2M',
      change: '+12%',
      changeType: 'positive' as const,
      icon: 'attach_money',
      iconColor: 'text-primary'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$85K',
      change: '+5%',
      changeType: 'positive' as const,
      icon: 'autorenew',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Active Premium Users',
      value: '3,420',
      change: '+3%',
      changeType: 'positive' as const,
      icon: 'group',
      iconColor: 'text-amber-500'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.5%',
      changeType: 'positive' as const,
      icon: 'person_remove',
      iconColor: 'text-rose-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}