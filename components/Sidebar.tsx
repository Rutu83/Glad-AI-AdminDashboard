'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Icon from './Icon'
import { useAuth } from '@/contexts/AuthContext'

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: string
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: 'dashboard' },
  { name: 'User Management', href: '/users', icon: 'group' },
  { name: 'Transaction Logs', href: '/transactions', icon: 'receipt_long' },
  { name: 'Revenue', href: '/revenue', icon: 'payments' },
  { name: 'AI Performance', href: '/ai-performance', icon: 'psychology' },
]

const systemNavItems: NavItem[] = [
  { name: 'Notifications', href: '/notifications', icon: 'notifications', badge: '3' },
  { name: 'Settings', href: '/settings', icon: 'settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { adminUser, signOut } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    router.replace('/login')
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 flex-none flex flex-col justify-between 
        border-r border-white/5 bg-sidebar-dark
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo & Nav */}
        <div className="flex flex-col gap-8 p-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-900 flex items-center justify-center shadow-neon">
              <Icon name="smart_toy" className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white neon-text">GLAD AI</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-6">
            {/* Main Group */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 pl-3">
                Main Menu
              </p>
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                    ${isActive(item.href)
                      ? 'bg-primary shadow-neon text-white'
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                    }
                  `}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* System Group */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 pl-3">
                System
              </p>
              {systemNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${isActive(item.href)
                      ? 'bg-primary shadow-neon text-white'
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                    }
                  `}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Footer / Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary/30 to-purple-900/30 flex items-center justify-center overflow-hidden border border-white/10">
                {adminUser?.avatar_url ? (
                  <Image
                    src={adminUser.avatar_url}
                    alt={adminUser.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <Icon name="person" className="text-primary" size={22} />
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-white">{adminUser?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400 truncate max-w-[120px]">{adminUser?.email || 'admin'}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors" title="Logout">
              <Icon name="logout" size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-3 left-4 z-[60] p-2 rounded-lg bg-sidebar-dark border border-white/10 text-white shadow-lg"
      >
        <Icon name="menu" />
      </button>
    </>
  )
}