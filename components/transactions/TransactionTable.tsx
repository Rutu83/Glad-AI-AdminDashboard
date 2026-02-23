import { useState } from 'react'
import Image from 'next/image'
import Icon from '../Icon'

export interface Transaction {
  // ... keep interface ...
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

interface TransactionTableProps {
  transactions: Transaction[]
}

// Generate a consistent gradient color from a name string
function getInitialsColor(name: string): string {
  const gradients = [
    'bg-gradient-to-br from-indigo-500 to-purple-600',
    'bg-gradient-to-tr from-pink-500 to-orange-500',
    'bg-gradient-to-br from-emerald-500 to-teal-600',
    'bg-gradient-to-tr from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-amber-500 to-red-500',
    'bg-gradient-to-tr from-violet-500 to-fuchsia-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return gradients[Math.abs(hash) % gradients.length]
}

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

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalItems = transactions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Calculate index ranges
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="flex-1 overflow-auto px-4 md:px-8 pb-8 z-10">
      <div className="bg-card-dark border border-border-dark rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark w-[140px]">
                  Timestamp
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                  Transaction ID
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                  User
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark hidden sm:table-cell">
                  Type
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                  Amount
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark hidden md:table-cell">
                  Category
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark">
                  Status
                </th>
                <th className="py-3 md:py-4 px-4 md:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-dark w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark font-mono text-sm">
              {currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-secondary font-display">
                    <Icon name="receipt_long" className="text-[40px] mb-2 block mx-auto opacity-40" />
                    No transactions found
                  </td>
                </tr>
              ) : (
                currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3 md:py-4 px-4 md:px-6 text-text-secondary">{transaction.timestamp}</td>
                    <td className="py-3 md:py-4 px-4 md:px-6 text-primary font-medium tracking-wide">{transaction.transactionId}</td>
                    <td className="py-3 md:py-4 px-4 md:px-6 font-display">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-gray-700 bg-cover bg-center overflow-hidden flex-shrink-0">
                          {transaction.user.avatar ? (
                            <Image
                              src={transaction.user.avatar}
                              alt={`Avatar of ${transaction.user.name}`}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${transaction.user.bgColor || getInitialsColor(transaction.user.name)}`}>
                              {transaction.user.initials || transaction.user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                            </div>
                          )}
                        </div>
                        <span className="text-white font-medium truncate max-w-[120px]">{transaction.user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 hidden sm:table-cell">
                      {getTypeBadge(transaction.type)}
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 text-white font-bold tracking-wide">{transaction.amount}</td>
                    <td className="py-3 md:py-4 px-4 md:px-6 text-text-secondary font-display hidden md:table-cell">{transaction.category}</td>
                    <td className="py-3 md:py-4 px-4 md:px-6 font-display">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 text-right">
                      <button className="text-text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="more_vert" className="text-[20px]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination / Footer of table */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 bg-black/20 border-t border-border-dark gap-3">
          <p className="text-xs text-text-secondary">
            {totalItems > 0 ? (
              <>Showing <span className="text-white font-medium">{startIndex + 1}-{endIndex}</span> of <span className="text-white font-medium">{totalItems}</span> transactions</>
            ) : (
              'No transactions'
            )}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-md border border-border-dark text-xs text-text-secondary hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-md border border-border-dark text-xs text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}