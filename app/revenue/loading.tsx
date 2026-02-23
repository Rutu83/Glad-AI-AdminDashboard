import Sidebar from '@/components/Sidebar'
import { Shimmer, ShimmerMetrics, ShimmerChart, ShimmerTable } from '@/components/Shimmer'

export default function RevenueLoading() {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header Skeleton */}
                <div className="p-6 md:p-8 border-b border-border-dark/50 flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <Shimmer className="h-8 w-48" />
                        <Shimmer className="h-4 w-72" />
                    </div>
                    <Shimmer className="h-10 w-32 rounded-lg" />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-8 py-8 max-w-7xl mx-auto w-full flex flex-col gap-8 pb-20">
                        <ShimmerMetrics count={4} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ShimmerChart />
                            <ShimmerChart />
                        </div>
                        <ShimmerTable rows={5} cols={5} />
                    </div>
                </div>
            </main>
        </div>
    )
}
