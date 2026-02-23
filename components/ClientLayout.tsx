'use client'

import { useAuth } from '@/contexts/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

const PUBLIC_ROUTES = ['/login']

export default function ClientLayout({ children }: { children: ReactNode }) {
    const { adminUser, isLoading } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    useEffect(() => {
        if (!isLoading && !adminUser && !isPublicRoute) {
            router.replace('/login')
        }
    }, [isLoading, adminUser, isPublicRoute, router])

    // Public routes (login) — render immediately
    if (isPublicRoute) {
        return <>{children}</>
    }

    // Protected routes — show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-900 flex items-center justify-center shadow-neon animate-pulse">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <p className="text-gray-400 text-sm">Verifying access...</p>
                </div>
            </div>
        )
    }

    // Not authenticated — will redirect via useEffect
    if (!adminUser) {
        return null
    }

    // Authenticated — render children
    return <>{children}</>
}
