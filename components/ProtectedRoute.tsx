'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { adminUser, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !adminUser) {
            router.replace('/login')
        }
    }, [isLoading, adminUser, router])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/30 animate-bounce" />
                    <div className="h-3 w-28 bg-white/10 rounded" />
                </div>
            </div>
        )
    }

    if (!adminUser) {
        return null // Will redirect via useEffect
    }

    return <>{children}</>
}
