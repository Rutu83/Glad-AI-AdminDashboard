'use client'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import DashboardMetrics from '@/components/dashboard/DashboardMetrics'
import DashboardCharts from '@/components/dashboard/DashboardCharts'
import RecentActivities from '@/components/dashboard/RecentActivities'
import PageShimmerWrapper from '@/components/PageShimmerWrapper'
import { ShimmerMetrics, ShimmerChart, ShimmerTable, ShimmerHeader } from '@/components/Shimmer'

function DashboardSkeleton() {
  return (
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
  )
}

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header title="Main Dashboard" />

        <PageShimmerWrapper fallback={<DashboardSkeleton />}>
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
              <DashboardMetrics />
              <DashboardCharts />
              <RecentActivities />
            </div>
          </div>
        </PageShimmerWrapper>
      </main>
    </div>
  )
}