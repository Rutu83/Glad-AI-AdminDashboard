import Sidebar from '@/components/Sidebar'
import { Shimmer, ShimmerChart } from '@/components/Shimmer'

export default function AIPerformanceLoading() {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Background Glow Effect */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

                {/* Header Skeleton */}
                <div className="p-6 md:p-8 border-b border-border-dark/50 flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <Shimmer className="h-8 w-56" />
                        <Shimmer className="h-4 w-80" />
                    </div>
                    <Shimmer className="h-10 w-28 rounded-lg" />
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-8 z-10">
                    <div className="flex flex-col gap-6 max-w-[1400px] pt-6">
                        {/* Gauge placeholders */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col items-center gap-4">
                                    <Shimmer className="h-32 w-32 rounded-full" />
                                    <Shimmer className="h-5 w-24" />
                                    <Shimmer className="h-3 w-16" />
                                </div>
                            ))}
                        </div>
                        <ShimmerChart height="h-64" />
                        {/* Terminal Skeleton */}
                        <div className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col gap-3">
                            <Shimmer className="h-5 w-32" />
                            <Shimmer className="h-48 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
