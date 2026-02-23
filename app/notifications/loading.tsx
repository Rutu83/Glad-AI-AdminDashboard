import Sidebar from '@/components/Sidebar'
import { Shimmer, ShimmerHeader, ShimmerTable } from '@/components/Shimmer'

export default function NotificationsLoading() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
                <div className="lg:hidden h-16"></div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-24">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        <ShimmerHeader />

                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                            {/* Left Column: Composer & History Skeleton */}
                            <div className="xl:col-span-8 flex flex-col gap-8">
                                {/* Composer Skeleton */}
                                <div className="bg-card-dark rounded-xl border border-border-dark/50 overflow-hidden shadow-xl">
                                    <div className="p-6 border-b border-border-dark/50 flex justify-between items-center bg-white/[0.02]">
                                        <Shimmer className="h-6 w-40" />
                                        <Shimmer className="h-6 w-16 rounded" />
                                    </div>
                                    <div className="p-6 md:p-8 flex flex-col gap-6">
                                        <Shimmer className="h-12 w-full rounded-lg" />
                                        <Shimmer className="h-28 w-full rounded-lg" />
                                        <Shimmer className="h-32 w-full rounded-xl" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Shimmer className="h-40 w-full rounded-lg" />
                                            <Shimmer className="h-40 w-full rounded-lg" />
                                        </div>
                                        <div className="flex justify-end gap-3 pt-4">
                                            <Shimmer className="h-12 w-28 rounded-lg" />
                                            <Shimmer className="h-12 w-40 rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                                {/* History Skeleton */}
                                <ShimmerTable rows={3} cols={5} />
                            </div>

                            {/* Right Column: Mobile Preview Skeleton */}
                            <div className="xl:col-span-4">
                                <div className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col items-center gap-4">
                                    <Shimmer className="h-[500px] w-full max-w-[280px] rounded-[2rem]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
