'use client'

import Image from 'next/image'
import Icon from '../Icon'

interface User {
  id: string
  name: string
  userId: string
  avatar: string
  plan: 'premium' | 'basic' | 'enterprise' | string
  status: 'active' | 'offline'
  usage: {
    used: number
    total: number
    percentage: number
  }
  joinedDate: string
}

interface UserTableProps {
  users: User[];
}

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

  const planKey = (plan === 'premium' || plan === 'enterprise' || plan === 'basic') ? plan : 'basic'

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[planKey]}`}>
      {icons[planKey] && <Icon name={icons[planKey]} size={14} />}
      {labels[planKey]}
    </span>
  )
}

function getStatusIndicator(status: User['status']) {
  const colors = {
    active: 'bg-green-500',
    offline: 'bg-gray-500'
  }

  const labels = {
    active: 'Active',
    offline: 'Offline'
  }

  const textColors = {
    active: 'text-green-400',
    offline: 'text-gray-400'
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
import { useState } from 'react'

function UserTableRow({ user, usage }: { user: User, usage: ReturnType<typeof formatUsage> }) {
  // Use ui-avatars immediately if the avatar is missing or explicitly undefined/empty.
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`
  const [imgSrc, setImgSrc] = useState(user.avatar ? user.avatar : fallbackSrc)

  return (
    <tr className="group hover:bg-white/5 transition-colors duration-200">
      <td className="px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="size-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
              <img
                src={imgSrc}
                alt={`Profile picture of ${user.name}`}
                className="h-full w-full object-cover"
                onError={() => {
                  setImgSrc(fallbackSrc)
                }}
              />
            </div>
            <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#141118] ${user.status === 'active' ? 'bg-green-500' :
              user.status === 'offline' ? 'bg-gray-500' : 'bg-red-500'
              }`}></div>
          </div>
          <div>
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-gray-600 text-[10px] uppercase font-mono mt-0.5">ID: {user.userId}</p>
          </div>
        </div>
      </td>
      <td className="px-4 md:px-6 py-4">
        <div className="flex flex-col items-start gap-1">
          {getPlanBadge(user.plan)}
          {getStatusIndicator(user.status)}
        </div>
      </td>
      <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
        <div className="w-full max-w-[140px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Used</span>
            <span className="text-white font-medium">{usage.percentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${user.plan === 'premium' ? 'bg-gradient-to-r from-primary to-purple-400' :
                user.plan === 'enterprise' ? 'bg-blue-400' : 'bg-gray-400'
                }`}
              style={{ width: `${usage.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{usage.display}</p>
        </div>
      </td>
      <td className="px-4 md:px-6 py-4 text-gray-300 hidden md:table-cell">{user.joinedDate}</td>
      <td className="px-4 md:px-6 py-4 text-right">
        <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Icon name="more_vert" />
        </button>
      </td>
    </tr>
  )
}

export default function UserTable({ users = [] }: UserTableProps) {
  return (
    <div className="rounded-xl border border-border-dark bg-[#141118]/50 overflow-hidden backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border-dark bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-4 md:px-6 py-4 font-semibold">User Profile</th>
              <th className="px-4 md:px-6 py-4 font-semibold">Plan Status</th>
              <th className="px-4 md:px-6 py-4 font-semibold hidden sm:table-cell">Usage (AI Tokens)</th>
              <th className="px-4 md:px-6 py-4 font-semibold hidden md:table-cell">Joined Date</th>
              <th className="px-4 md:px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-border-dark/50">
            {users.map((user) => {
              const usage = formatUsage(user.usage)
              return (
                <UserTableRow key={user.id} user={user} usage={usage} />
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 bg-[#141118] border-t border-border-dark gap-3">
        <p className="text-sm text-gray-400">
          Showing <span className="text-white font-medium">1-{users.length}</span> of <span className="text-white font-medium">{users.length}</span> users
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="chevron_left" size={18} />
          </button>
          <button className="size-8 rounded-lg bg-primary text-white text-sm font-medium shadow-lg shadow-primary/20">1</button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
            <Icon name="chevron_right" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}