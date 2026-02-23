import Sidebar from '@/components/Sidebar'
import { Shimmer } from '@/components/Shimmer'

export default function SettingsLoading() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />

            <main className="flex-1 h-full overflow-y-auto bg-background-dark relative flex flex-col">
                <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                    {/* Header Skeleton */}
                    <div className="flex flex-col gap-3">
                        <Shimmer className="h-8 w-48" />
                        <Shimmer className="h-4 w-72" />
                    </div>

                    {/* Tabs Skeleton */}
                    <div className="flex gap-2 border-b border-border-dark/50 pb-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Shimmer key={i} className="h-9 w-28 rounded-lg" />
                        ))}
                    </div>

                    {/* Content Skeleton */}
                    <div className="flex flex-col gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col gap-4">
                                <Shimmer className="h-5 w-40" />
                                <Shimmer className="h-4 w-full max-w-md" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <Shimmer className="h-10 w-full rounded-lg" />
                                    <Shimmer className="h-10 w-full rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Skeleton */}
                <div className="sticky bottom-0 w-full bg-[#191022]/80 backdrop-blur-md border-t border-[#302839] p-4 flex justify-end items-center px-10 gap-4">
                    <Shimmer className="h-10 w-24 rounded-lg" />
                    <Shimmer className="h-10 w-32 rounded-lg" />
                </div>
            </main>
        </div>
    )
}
