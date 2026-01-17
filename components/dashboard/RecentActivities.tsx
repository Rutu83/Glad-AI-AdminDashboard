import Icon from '../Icon'

interface Activity {
  id: string
  type: string
  user: string
  status: 'completed' | 'verified' | 'pending'
  time: string
  icon: string
  iconColor: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'Model Retraining',
    user: 'System AI',
    status: 'completed',
    time: '2 mins ago',
    icon: 'smart_toy',
    iconColor: 'bg-primary/20 text-primary'
  },
  {
    id: '2',
    type: 'New User Login',
    user: 'Sarah Connor',
    status: 'verified',
    time: '15 mins ago',
    icon: 'login',
    iconColor: 'bg-accent-cyan/20 text-accent-cyan'
  },
  {
    id: '3',
    type: 'API Limit Warning',
    user: 'Enterprise Node #4',
    status: 'pending',
    time: '42 mins ago',
    icon: 'warning',
    iconColor: 'bg-orange-500/20 text-orange-400'
  }
]

function getStatusBadge(status: Activity['status']) {
  const styles = {
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    verified: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    pending: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  }

  const labels = {
    completed: 'Completed',
    verified: 'Verified',
    pending: 'Pending'
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function RecentActivities() {
  return (
    <div className="glass-panel rounded-2xl p-0 overflow-hidden mb-6">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Recent Activities</h3>
        <button className="text-sm text-primary hover:text-white transition-colors font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 uppercase text-xs font-semibold text-gray-300">
            <tr>
              <th className="px-6 py-4">Activity</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className={`h-8 w-8 rounded ${activity.iconColor} flex items-center justify-center`}>
                    <Icon name={activity.icon} size={18} />
                  </div>
                  <span className="text-white font-medium">{activity.type}</span>
                </td>
                <td className="px-6 py-4">{activity.user}</td>
                <td className="px-6 py-4">
                  {getStatusBadge(activity.status)}
                </td>
                <td className="px-6 py-4">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}