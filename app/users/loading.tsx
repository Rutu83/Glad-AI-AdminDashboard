import Sidebar from '@/components/Sidebar'
import { ShimmerHeader, ShimmerFilters, ShimmerTable } from '@/components/Shimmer'

export default function UsersLoading() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
                <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[100px] pointer-events-none"></div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mx-auto max-w-7xl flex flex-col gap-8">
                        <ShimmerHeader />
                        <ShimmerFilters />
                        <ShimmerTable rows={6} cols={5} />
                    </div>
                </div>
            </main>
        </div>
    )
}
