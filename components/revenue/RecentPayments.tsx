import Image from 'next/image'
import Icon from '../Icon'

interface Payment {
  id: string
  user: {
    name: string
    email: string
    avatar: string
  }
  plan: 'pro' | 'enterprise' | 'basic'
  amount: string
  date: string
  method: string
  methodIcon: string
}

const payments: Payment[] = [
  {
    id: '1',
    user: {
      name: 'Liam Johnson',
      email: 'liam@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoUxMPHa0ddoGk_TLsRq_1Yp6oClsmgwqQF6ykaMIDHG0hKBxWecUaSvjmSNNMvrPK7KXg1iVAJ4zo8e7tsmSOTkyEGSXFU6yx9k1IivjuSU2nK1-1Xsj_DSvowQW4UBAxpWuCNb0N184Vc0vbnv1b7hoHf01_ApTlq8VVY3fMgLdiZOtad2fdLDTRh_GX9gP5QdmnOZjPsRvR9D996XoMd33i6MLKOlXLxyeyeL1JNViPX77nTxGb4jVTGS_5fl87HOKkyVKSOjBG'
    },
    plan: 'pro',
    amount: '$29.00',
    date: 'Oct 24, 2023',
    method: 'Visa **4242',
    methodIcon: 'credit_card'
  },
  {
    id: '2',
    user: {
      name: 'Sophia Williams',
      email: 'sophia.w@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1mjPsukyHr9xzdkdveIJPkgThJRUFbaNQEIEGZ5U0wWBDxyaFJnzU5QFzd_xMwdowVxJvUMPnz8LQHCfWkSCHkPtWvNv0n0-_5P9yILad0RAnZNM7CDtsvIw4x7ZvP69S8hO6_KaS2RSNLa3FSDxuO1xrkR86dnf67MMq-N1K22SnnDzbwumnLUm16v3IpOvOKCL156QBqDDmrwNktjO-xWO6T4kqC8gDDEZ0U_6dTFkgcB-rZYUiINLXpKLRFszEwT9JKGMTWD90'
    },
    plan: 'enterprise',
    amount: '$199.00',
    date: 'Oct 24, 2023',
    method: 'Wire Transfer',
    methodIcon: 'account_balance'
  },
  {
    id: '3',
    user: {
      name: 'Ethan Brown',
      email: 'ethan.b@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPv6ntvI1RLbWqC7-MKBKUCszqkoJuLzgkiVxLIxPvBOtqb7T5uIlAGOiNoxJeL0SYM-KK2x4UCbiNz2A6ib_ozUOau2FsngNsgmW8iT34IcTaDUW7dO50ncAFxoV-HaqjbRyroQX5DXvqQ8V4QjAQdFeg5yGtUAyMT7m-LRafTbCZcVD5H7M1FWSkJt7TlZvV9ou2sKaQbXAMIZEGsKSg8AYz_ecosakVUdEPOjAdgQmUgQMCo5M1FKda3bHVJVXRBAv9EYdx2Ng-'
    },
    plan: 'pro',
    amount: '$29.00',
    date: 'Oct 23, 2023',
    method: 'UPI',
    methodIcon: 'qr_code_2'
  },
  {
    id: '4',
    user: {
      name: 'Noah Wilson',
      email: 'noah.w@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpCJU5XytU0Xb5uTyDqOfSnrdb70-FVgPxZ8nm6HnlBkQ4zRqtj74tvb_M3wVP-NakmCIL1f_BoAtiVHvqnCpnpE5mXnJTXqm_jLrqu72l7LESkv7ASdOoloKyl8F_nPbs8cFpzTGcBfrA1FldBsRFaGe0_eY9JS9rQDozey7bbN2y5Y1py8AhbTRAfBmVvHD3FcA4tTnZYrh6uTLxsUImZSEXO9-PvobISCA3QvpRGKz0hl3EvL0DJiOgTc855zFc3aqq4qAGWN63'
    },
    plan: 'basic',
    amount: '$9.00',
    date: 'Oct 23, 2023',
    method: 'Mastercard **8833',
    methodIcon: 'credit_card'
  }
]

function getPlanBadge(plan: Payment['plan']) {
  const styles = {
    pro: 'bg-primary/10 text-primary border-primary/20',
    enterprise: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    basic: 'bg-white/10 text-white border-white/20'
  }

  const labels = {
    pro: 'Pro Plan',
    enterprise: 'Enterprise',
    basic: 'Basic Plan'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[plan]}`}>
      {labels[plan]}
    </span>
  )
}

export default function RecentPayments() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold tracking-tight">Recent Successful Payments</h2>
        <a className="text-primary text-sm font-medium hover:text-white transition-colors" href="#">View All</a>
      </div>
      
      <div className="rounded-2xl border border-white/5 bg-card-dark overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
              {payments.map((payment) => (
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
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Success
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