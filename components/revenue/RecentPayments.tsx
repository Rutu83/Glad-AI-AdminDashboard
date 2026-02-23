import Image from 'next/image'
import Icon from '../Icon'

export interface Payment {
  id: string
  user: {
    name: string
    email: string
    avatar: string
  }
  plan: 'pro' | 'enterprise' | 'basic' | string
  amount: string
  date: string
  method: string
  methodIcon: string
  status?: string
}

// Remove hardcoded payments completely

function getPlanBadge(plan: Payment['plan']) {
  const styles: Record<string, string> = {
    pro: 'bg-primary/10 text-primary border-primary/20',
    enterprise: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    basic: 'bg-white/10 text-white border-white/20'
  }

  const labels: Record<string, string> = {
    pro: 'Pro Plan',
    enterprise: 'Enterprise',
    basic: 'Basic Plan'
  }

  const normalizedPlan = typeof plan === 'string' ? plan.toLowerCase() : 'basic'
  const badgeStyle = styles[normalizedPlan] || styles['basic']
  const badgeLabel = labels[normalizedPlan] || (normalizedPlan.charAt(0).toUpperCase() + normalizedPlan.slice(1))

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle}`}>
      {badgeLabel}
    </span>
  )
}

export default function RecentPayments({ payments = [] }: { payments?: Payment[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold tracking-tight">Recent Successful Payments</h2>
        <a className="text-primary text-sm font-medium hover:text-white transition-colors" href="#">View All</a>
      </div>

      <div className="rounded-2xl border border-white/5 bg-card-dark overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 pl-6 text-text-secondary text-xs font-semibold uppercase tracking-wider">User</th>
                <th className="p-4 text-text-secondary text-xs font-semibold uppercase tracking-wider">Plan</th>
                <th className="p-4 text-text-secondary text-xs font-semibold uppercase tracking-wider">Amount</th>
                <th className="p-4 text-text-secondary text-xs font-semibold uppercase tracking-wider">Date</th>
                <th className="p-4 text-text-secondary text-xs font-semibold uppercase tracking-wider">Method</th>
                <th className="p-4 pr-6 text-text-secondary text-xs font-semibold uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-text-secondary">
                    No recent payments found.
                  </td>
                </tr>
              ) : payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full overflow-hidden ring-1 ring-white/10">
                        <Image
                          src={payment.user.avatar}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">{payment.user.name}</span>
                        <span className="text-text-secondary text-xs">{payment.user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getPlanBadge(payment.plan)}
                  </td>
                  <td className="p-4">
                    <span className="text-white text-sm font-bold">{payment.amount}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-text-secondary text-sm">{payment.date}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <Icon name={payment.methodIcon} className="text-base" />
                      {payment.method}
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${payment.status?.toLowerCase() === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : payment.status?.toLowerCase() === 'failed'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                      <span className={`size-1.5 rounded-full animate-pulse ${payment.status?.toLowerCase() === 'success' ? 'bg-emerald-400' :
                        payment.status?.toLowerCase() === 'failed' ? 'bg-red-400' : 'bg-amber-400'
                        }`}></span>
                      {payment.status || 'Success'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}