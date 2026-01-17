import Image from 'next/image'
import Icon from '../Icon'

interface Transaction {
  id: string
  timestamp: string
  transactionId: string
  user: {
    name: string
    avatar?: string
    initials?: string
    bgColor?: string
  }
  type: 'voice' | 'manual'
  amount: string
  category: string
  status: 'success' | 'pending' | 'failed'
}

const transactions: Transaction[] = [
  {
    id: '1',
    timestamp: 'Oct 24, 14:02:45',
    transactionId: 'TXN-8842-AF',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq_WH8BpHP0ivCkEnM9ciEJxT0lBf6cNxylLBaK2Fw3SqMjJtFQh3YWmlLr5yw4pttany3wuo-d1j7CWKsqE5jzWbftPvt6XHdTdeRnv31AMGg8QENoKcPNfdtFSt0f8s6Br2Ln-Sc1SuyBD0qurkFfcYq4olCwiffQ4ekED1K7XbZPH98_7LVMJ0kS5hzeHTluJ_3GyxGa4Hq-aEdlzXomlAcNOsX5h-o-PX1eHYvJvCWHJP_NiW3o8NlNaaycEjtV7Wk9KRS8HJR'
    },
    type: 'voice',
    amount: '$45.00',
    category: 'Subscription',
    status: 'success'
  },
  {
    id: '2',
    timestamp: 'Oct 24, 14:01:12',
    transactionId: 'TXN-8841-BB',
    user: {
      name: 'Michael Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy8nhGWKxu4QIPfjh7T4F3-W6g4M8bSvRUkwW7uCp6-ihaDGEWUoV6ObHCGt7syna4D-misr8uMTQ_ASgG-Oj5sR4U4sfJdhjedeCgGv6RVE2OkDoxucjXuhpjOBi8MbgBHMXL5cl-GjBcwljk2feOj8Bqyu4QadY7pms2deckNP9-0KMFbrkeJ4UJBNDjwZx7MspJaaoqvJ04QgIaq0oyX2jzQt8vIgbJAEQic7giDxQcIVgfE-OjU_hEEGeK1u6OFIpQC-bsVc08'
    },
    type: 'manual',
    amount: '$120.50',
    category: 'API Usage',
    status: 'pending'
  },
  {
    id: '3',
    timestamp: 'Oct 24, 13:58:33',
    transactionId: 'TXN-8840-XQ',
    user: {
      name: 'Elena Kovacs',
      initials: 'EK',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600'
    },
    type: 'voice',
    amount: '$9.99',
    category: 'Micro-txn',
    status: 'failed'
  },
  {
    id: '4',
    timestamp: 'Oct 24, 13:55:01',
    transactionId: 'TXN-8839-PL',
    user: {
      name: 'Robert Fox',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnPfIpt-YHBygdQCQp3sO-6kvCVQgth--VYVZ5BjaJmE73yhMLgP46jT4b1-csR1u47fcBRFmhxlxZOErenR_cCERtZUf0qo3_Q22r-28e1Xx5HTTJWm18E9Qr-kY5b9kdUMIE4adLai3rGII6SZ2l0PA5Srus3aOnovW-Ya6acGwD1xKmn_JQGLgMJ1RPdhkhMsGfdxOHbgYQrA662cdfIxG9ccJKQXJ2EA5CNeXZjWPfNp-rRm-MX1ohS51mmxm7lKfPFcpRD535'
    },
    type: 'manual',
    amount: '$299.00',
    category: 'Enterprise',
    status: 'success'
  },
  {
    id: '5',
    timestamp: 'Oct 24, 13:48:19',
    transactionId: 'TXN-8838-MN',
    user: {
      name: 'Jenny Lane',
      initials: 'JL',
      bgColor: 'bg-gradient-to-tr from-pink-500 to-orange-500'
    },
    type: 'voice',
    amount: '$45.00',
    category: 'Subscription',
    status: 'success'
  },
  {
    id: '6',
    timestamp: 'Oct 24, 13:42:05',
    transactionId: 'TXN-8837-AZ',
    user: {
      name: 'Albert Flores',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5qveKpipQC_7g6I_QuBpxy3vGhgIu0JdxN249XjeZ1bHw8fwMjIOYZfEUxbdiF0OZfFgg2nG38GLTHwOMKpdZ0HNzS0gpmw1zgIkijmVd78X9jFCBzOLM0JKGResnpjilieslwTAdhP_kt4hJnZoZ57VzIMCq48TOIitX7LBeiEge5g9xlrtFbIwTqqKGo0h9GO22aB-N82vptRYX_pgxQkkDJP3a5NqM58DxVRqDkpnyvE7ARuBCBvyUnlQ8Mn2k70rGLamyT-8_'
    },
    type: 'manual',
    amount: '$850.00',
    category: 'Bulk Purchase',
    status: 'success'
  }
]

function getTypeBadge(type: Transaction['type']) {
  if (type === 'voice') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 font-display">
        <Icon name="graphic_eq" className="text-[14px]" />
        Voice
      </span>
    )
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-700/30 text-gray-300 text-xs font-medium border border-gray-600/30 font-display">
      <Icon name="touch_app" className="text-[14px]" />
      Manual
    </span>
  )
}

function getStatusBadge(status: Transaction['status']) {
  const styles = {
    success: 'text-green-400',
    pending: 'text-yellow-400',
    failed: 'text-red-400'
  }

  const dots = {
    success: 'bg-green-500 shadow-neon-green',
    pending: 'bg-yellow-500',
    failed: 'bg-red-500 shadow-red-500/50'
  }

  const labels = {
    success: 'Success',
    pending: 'Pending',
    failed: 'Failed'
  }

  return (
    <div className="flex items-center gap-2 font-display">
      <div className={`size-2 rounded-full ${dots[status]}`}></div>
      <span className={`font-medium ${styles[status]}`}>{labels[status]}</span>
    </div>
  )
}

export default function TransactionTable() {
  return (
    <div className="flex-1 overflow-auto px-8 pb-8 z-10">
      <div className="bg-card-dark border border-border-dark rounded-xl shadow-xl overflow-hidden min-w-[800px]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark w-[160px]">
                Timestamp
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                Transaction ID
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                User
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                Type
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                Amount
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                Category
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                Status
              </th>
              <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark font-mono text-sm">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-6 text-text-secondary">{transaction.timestamp}</td>
                <td className="py-4 px-6 text-primary font-medium tracking-wide">{transaction.transactionId}</td>
                <td className="py-4 px-6 font-display">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-gray-700 bg-cover bg-center overflow-hidden">
                      {transaction.user.avatar ? (
                        <Image
                          src={transaction.user.avatar}
                          alt={`Avatar of ${transaction.user.name}`}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${transaction.user.bgColor}`}>
                          {transaction.user.initials}
                        </div>
                      )}
                    </div>
                    <span className="text-white font-medium">{transaction.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getTypeBadge(transaction.type)}
                </td>
                <td className="py-4 px-6 text-white font-bold tracking-wide">{transaction.amount}</td>
                <td className="py-4 px-6 text-text-secondary font-display">{transaction.category}</td>
                <td className="py-4 px-6 font-display">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="more_vert" className="text-[20px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination / Footer of table */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/20 border-t border-border-dark">
          <p className="text-xs text-text-secondary">
            Showing <span className="text-white font-medium">1-6</span> of <span className="text-white font-medium">1,248</span> transactions
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-md border border-border-dark text-xs text-text-secondary hover:bg-white/5 hover:text-white disabled:opacity-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-md border border-border-dark text-xs text-white bg-primary hover:bg-primary/90 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}