import Icon from '../Icon'

const campaigns = [
  {
    id: '1',
    name: 'Pro Feature Launch',
    audience: 'All Users',
    dateSent: 'Oct 24, 2023',
    status: 'sent',
    openRate: 42,
    icon: 'rocket',
    iconColor: 'bg-blue-500/20 text-blue-400'
  },
  {
    id: '2',
    name: 'Weekend Promo',
    audience: 'Free Only',
    dateSent: 'Oct 18, 2023',
    status: 'sent',
    openRate: 18,
    icon: 'celebration',
    iconColor: 'bg-purple-500/20 text-purple-400'
  },
  {
    id: '3',
    name: 'System Downtime',
    audience: 'Premium',
    dateSent: 'Nov 01, 2023',
    status: 'scheduled',
    openRate: null,
    icon: 'schedule',
    iconColor: 'bg-orange-500/20 text-orange-400'
  }
]

function getStatusBadge(status: string) {
  if (status === 'sent') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
        Sent
      </span>
    )
  }
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
      Scheduled
    </span>
  )
}

export default function CampaignHistory() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-xl font-bold px-1">Campaign History</h3>
      <div className="bg-card-dark rounded-xl border border-border-dark/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-border-dark/50">
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Campaign Name</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Audience</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Date Sent</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-32">Open Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark/30">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded flex items-center justify-center ${campaign.iconColor}`}>
                        <Icon name={campaign.icon} size={16} />
                      </div>
                      <span className="text-white font-medium text-sm">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">{campaign.audience}</td>
                  <td className="p-4 text-text-secondary text-sm">{campaign.dateSent}</td>
                  <td className="p-4">{getStatusBadge(campaign.status)}</td>
                  <td className="p-4">
                    {campaign.openRate ? (
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-white">
                          <span>{campaign.openRate}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full neon-glow" 
                            style={{ width: `${campaign.openRate}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-text-secondary text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border-dark/50 flex justify-center">
          <button className="text-primary text-sm font-medium hover:text-white transition-colors">View All Campaigns</button>
        </div>
      </div>
    </div>
  )
}