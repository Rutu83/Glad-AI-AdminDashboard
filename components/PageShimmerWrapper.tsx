'use client'

import { useState, useEffect, ReactNode } from 'react'

interface PageShimmerWrapperProps {
    children: ReactNode
    fallback: ReactNode
    /** Duration in ms to show the shimmer before revealing content. Default: 600ms */
    delay?: number
    /** Optional explicit loading state. If provided, overrides the automatic delay timer. */
    isLoading?: boolean
}

export default function PageShimmerWrapper({ children, fallback, delay = 600, isLoading: explicitLoading }: PageShimmerWrapperProps) {
    const [isTimerLoading, setIsTimerLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimerLoading(false)
        }, delay)

        return () => clearTimeout(timer)
    }, [delay])

    const isLoading = explicitLoading !== undefined ? explicitLoading : isTimerLoading

    if (isLoading) return <div className="flex-1 flex flex-col min-h-0 overflow-hidden">{fallback}</div>

    return (
        <div className="animate-fadeIn flex-1 flex flex-col min-h-0 overflow-hidden">
            {children}
        </div>
    )
}
