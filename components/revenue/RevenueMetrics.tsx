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

export default function RevenueMetrics({
  totalRevenue = 0,
  lastMonthRevenue = 0,
  monthlyRecurringRevenue = 0,
  lastMonthMrr = 0,
  activePremiumUsers = 0,
  lastMonthActivePremiumUsers = 0,
  conversionRate = 0,
  lastMonthConversionRate = 0
}: {
  totalRevenue?: number;
  lastMonthRevenue?: number;
  monthlyRecurringRevenue?: number;
  lastMonthMrr?: number;
  activePremiumUsers?: number;
  lastMonthActivePremiumUsers?: number;
  conversionRate?: number;
  lastMonthConversionRate?: number;
}) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
  };

  const calculateChange = (current: number, lastMonth: number) => {
    if (lastMonth === 0 && current > 0) return { label: '+100%', type: 'positive' as const };
    if (lastMonth === 0 && current === 0) return { label: '0%', type: 'positive' as const };

    const change = ((current - lastMonth) / lastMonth) * 100;
    const isPositive = change >= 0;
    return {
      label: `${isPositive ? '+' : ''}${change.toFixed(1)}%`,
      type: isPositive ? 'positive' as const : 'negative' as const
    };
  };

  const revChange = calculateChange(totalRevenue, lastMonthRevenue);
  const mrrChange = calculateChange(monthlyRecurringRevenue, lastMonthMrr);
  const usersChange = calculateChange(activePremiumUsers, lastMonthActivePremiumUsers);
  const convChange = calculateChange(conversionRate, lastMonthConversionRate);

  const metrics = [
    {
      title: 'Total Revenue',
      value: totalRevenue > 0 ? formatCurrency(totalRevenue) : '$0',
      change: revChange.label,
      changeType: revChange.type,
      icon: 'attach_money',
      iconColor: 'text-primary'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: monthlyRecurringRevenue > 0 ? formatCurrency(monthlyRecurringRevenue) : '$0',
      change: mrrChange.label,
      changeType: mrrChange.type,
      icon: 'autorenew',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Active Premium Users',
      value: activePremiumUsers > 0 ? activePremiumUsers.toLocaleString() : '0',
      change: usersChange.label,
      changeType: usersChange.type,
      icon: 'group',
      iconColor: 'text-amber-500'
    },
    {
      title: 'Conversion Rate',
      value: conversionRate > 0 ? `${conversionRate.toFixed(1)}%` : '0%',
      change: convChange.label,
      changeType: convChange.type,
      icon: 'sync_alt',
      iconColor: 'text-purple-400'
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