import Sidebar from '@/components/Sidebar'
import { ShimmerMetrics, ShimmerChart, ShimmerTable, ShimmerHeader } from '@/components/Shimmer'

export default function DashboardLoading() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Shimmer Header */}
                <div className="p-6 border-b border-border-dark/50">
                    <ShimmerHeader />
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto flex flex-col gap-6">
                        <ShimmerMetrics count={4} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ShimmerChart />
                            <ShimmerChart />
                        </div>
                        <ShimmerTable rows={4} cols={4} />
                    </div>
                </div>
            </main>
        </div>
    )
}
