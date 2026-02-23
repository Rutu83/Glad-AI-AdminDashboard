'use client'

interface ShimmerProps {
    className?: string
}

export function Shimmer({ className = '' }: ShimmerProps) {
    return <div className={`shimmer ${className}`} />
}

/** A row of shimmer blocks for metric cards */
export function ShimmerMetrics({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col gap-3">
                    <Shimmer className="h-4 w-24" />
                    <Shimmer className="h-8 w-32" />
                    <Shimmer className="h-3 w-20" />
                </div>
            ))}
        </div>
    )
}

/** A shimmer block for chart areas */
export function ShimmerChart({ height = 'h-72' }: { height?: string }) {
    return (
        <div className={`bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col gap-4`}>
            <div className="flex justify-between items-center">
                <Shimmer className="h-5 w-40" />
                <Shimmer className="h-8 w-24 rounded-lg" />
            </div>
            <Shimmer className={`${height} w-full rounded-xl`} />
        </div>
    )
}

/** A shimmer block for table rows */
export function ShimmerTable({ rows = 5, cols = 5 }: { rows?: number, cols?: number }) {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark/50 overflow-hidden">
            {/* Header */}
            <div className="flex gap-4 p-4 bg-white/5 border-b border-border-dark/50">
                {Array.from({ length: cols }).map((_, i) => (
                    <Shimmer key={i} className="h-4 flex-1" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 p-4 border-b border-border-dark/30 items-center">
                    {Array.from({ length: cols }).map((_, j) => (
                        <Shimmer key={j} className={`h-4 flex-1 ${j === 0 ? 'max-w-[180px]' : ''}`} />
                    ))}
                </div>
            ))}
        </div>
    )
}

/** A shimmer block for header sections */
export function ShimmerHeader() {
    return (
        <div className="flex flex-col gap-3 mb-2">
            <Shimmer className="h-8 w-64" />
            <Shimmer className="h-4 w-96" />
        </div>
    )
}

/** A shimmer block for filter bars */
export function ShimmerFilters() {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end bg-card-dark/50 p-4 rounded-xl border border-border-dark">
            <Shimmer className="h-10 w-full md:w-96 rounded-lg" />
            <div className="flex gap-4">
                <Shimmer className="h-10 w-40 rounded-lg" />
                <Shimmer className="h-10 w-40 rounded-lg" />
                <Shimmer className="h-10 w-32 rounded-lg" />
            </div>
        </div>
    )
}
