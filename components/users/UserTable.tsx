import Image from 'next/image'
import Icon from '../Icon'

interface User {
  id: string
  name: string
  email: string
  userId: string
  avatar: string
  plan: 'premium' | 'basic' | 'enterprise'
  status: 'active' | 'offline' | 'banned'
  usage: {
    used: number
    total: number
    percentage: number
  }
  joinedDate: string
}

const users: User[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    userId: 'usr_88291',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlppBSF1zm9WpftCNfx0ICWJa46l4Njg1LjocERRSmMKiIZpvnTx3_KTnGGMfyvGATocabQ-jQiKdnYosQT2Yjx64Ybqf08q9Evw3g592VQKyvjjyVIFeAFPcVqUJ53n_aQ84yry8HkBYkJitoBOvTPrIDzXOO4CwtgzPBJ8MHjmgcNoqLwfq1_v8aITEAMGzWDFrj5UCy4TUxNYWQr2Do1lvDYUjsGNfjp48-Yb2zDbnq7y_tUlBArK3UKVY1aYseCPu3NF46KUtI',
    plan: 'premium',
    status: 'active',
    usage: { used: 420000, total: 500000, percentage: 84 },
    joinedDate: 'Oct 24, 2023'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@techflow.io',
    userId: 'usr_99210',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz5Rm-eo3J3R0p6PXW65zNWq3hwOy5jC8txh49PWr9wgFYD2vhUCFdpeVMbKbj5EfZYcXDNewZQIVrMNSQbpxIMWoQoEwuMwCw0keaHW4eN2vw_4MUO7twshMv53iP-dUU2qkWr9WfOaG1IGllNLvG9xvUI3rtGWkEScua9-iONKRXLTwZ4O3ghZGRIJbr0AFaiFspxT4BCaB2w9SV0SnNNRPKit5NO-4Z17kVj-EsaGHpncNM_dtGb2ozLD9Qrm-JqJc22XhOOgYl',
    plan: 'basic',
    status: 'offline',
    usage: { used: 1200, total: 10000, percentage: 12 },
    joinedDate: 'Nov 02, 2023'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.rod@creative.studio',
    userId: 'usr_11204',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcoMg2RuNzXNRBB2nBFq2d6MP6AIIsanmv4LXFU6Iesz5wDlOH8H0dhLDM0l4BK-_Hl0kuFdKkGXjNz10oivUDQGzzl5Wj-Es-UBoFnxFddmkNWmKBk6a0VCHkhbrzFPUC5T5Zd19J9Vxbe2zmvZ2NOd3hR_V79jZGRLyx9o_Zs-sOqGZ-2JURj3B75S_HUx1lKmnhcRiuTKaYrbDIMysF-9G9bRYN7jdual31spa8R6bUEdtsZ2294HV9WNlkOHohstgfNhA9sPuq',
    plan: 'enterprise',
    status: 'active',
    usage: { used: 4500000, total: 10000000, percentage: 45 },
    joinedDate: 'Aug 10, 2023'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'kim.d@startup.io',
    userId: 'usr_77219',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_e54TLPQ1KEk2vitvJbdClMVL6uTKkQneO43fpmLWVRMprzQdceSFHKW8rZZv_YfhgMjQW55pql5UFzH13BCwjr31xDFkKqBYQCGIprU3fe_TSeE_PH93XfM0Fnr7_BmwUrvV--zY27t_FStnNrC4I14T1mK0q6HK-iue0yrFJmjS94r1FMBWH8XZtstbBBD60ya_HRJFgQEozgzTb32x4ub_I8kZt6IFtMylxORtmDh3cFwhkIQMKDb-97o06gvhMvEZ26c-vvtI',
    plan: 'premium',
    status: 'active',
    usage: { used: 25000, total: 500000, percentage: 5 },
    joinedDate: 'Dec 01, 2023'
  }
]

function getPlanBadge(plan: User['plan']) {
  const styles = {
    premium: 'bg-gradient-to-r from-purple-500/20 to-primary/20 text-purple-200 border-purple-500/30',
    basic: 'bg-white/5 text-gray-300 border-white/10',
    enterprise: 'bg-blue-500/10 text-blue-300 border-blue-500/20'
  }

  const icons = {
    premium: 'diamond',
    basic: '',
    enterprise: 'apartment'
  }

  const labels = {
    premium: 'Premium',
    basic: 'Basic',
    enterprise: 'Enterprise'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[plan]}`}>
      {icons[plan] && <Icon name={icons[plan]} size={14} />}
      {labels[plan]}
    </span>
  )
}

function getStatusIndicator(status: User['status']) {
  const colors = {
    active: 'bg-green-500',
    offline: 'bg-gray-500',
    banned: 'bg-red-500'
  }

  const labels = {
    active: 'Active',
    offline: 'Offline',
    banned: 'Banned'
  }

  const textColors = {
    active: 'text-green-400',
    offline: 'text-gray-400',
    banned: 'text-red-400'
  }

  return (
    <span className={`text-[10px] flex items-center gap-1 ${textColors[status]}`}>
      <div className={`size-1.5 rounded-full ${colors[status]}`}></div>
      {labels[status]}
    </span>
  )
}

function formatUsage(usage: User['usage']) {
  const { used, total, percentage } = usage
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return {
    display: `${formatNumber(used)} / ${formatNumber(total)} tokens`,
    percentage
  }
}

export default function UserTable() {
  return (
    <div className="rounded-xl border border-border-dark bg-[#141118]/50 overflow-hidden backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-dark bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">User Profile</th>
              <th className="px-6 py-4 font-semibold">Plan Status</th>
              <th className="px-6 py-4 font-semibold">Usage (AI Tokens)</th>
              <th className="px-6 py-4 font-semibold">Joined Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-border-dark/50">
            {users.map((user) => {
              const usage = formatUsage(user.usage)
              return (
                <tr key={user.id} className="group hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="size-10 rounded-full overflow-hidden">
                          <Image
                            src={user.avatar}
                            alt={`Profile picture of ${user.name}`}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#141118] ${
                          user.status === 'active' ? 'bg-green-500' : 
                          user.status === 'offline' ? 'bg-gray-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                        <p className="text-gray-600 text-[10px] uppercase font-mono mt-0.5">ID: {user.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      {getPlanBadge(user.plan)}
                      {getStatusIndicator(user.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[140px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Used</span>
                        <span className="text-white font-medium">{usage.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            user.plan === 'premium' ? 'bg-gradient-to-r from-primary to-purple-400' :
                            user.plan === 'enterprise' ? 'bg-blue-400' : 'bg-gray-400'
                          }`}
                          style={{ width: `${usage.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{usage.display}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.joinedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Icon name="more_vert" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#141118] border-t border-border-dark">
        <p className="text-sm text-gray-400">
          Showing <span className="text-white font-medium">1-4</span> of <span className="text-white font-medium">1,248</span> users
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="chevron_left" size={18} />
          </button>
          <button className="size-8 rounded-lg bg-primary text-white text-sm font-medium shadow-lg shadow-primary/20">1</button>
          <button className="size-8 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">2</button>
          <button className="size-8 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">3</button>
          <span className="text-gray-500">...</span>
          <button className="size-8 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">12</button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
            <Icon name="chevron_right" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}