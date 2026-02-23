import Sidebar from '@/components/Sidebar'
import { Shimmer, ShimmerTable } from '@/components/Shimmer'

export default function TransactionsLoading() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header Skeleton */}
                <div className="p-6 md:p-8 border-b border-border-dark/50 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <Shimmer className="h-8 w-56" />
                            <Shimmer className="h-4 w-80" />
                        </div>
                        <div className="flex gap-3">
                            <Shimmer className="h-10 w-28 rounded-lg" />
                            <Shimmer className="h-10 w-28 rounded-lg" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <ShimmerTable rows={8} cols={6} />
                </div>
            </main>
        </div>
    )
}
