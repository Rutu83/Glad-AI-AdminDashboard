'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AIPerformanceHeader from '@/components/ai-performance/AIPerformanceHeader'
import PerformanceGauges from '@/components/ai-performance/PerformanceGauges'
import CostChart from '@/components/ai-performance/CostChart'
import LiveTerminal from '@/components/ai-performance/LiveTerminal'
import PageShimmerWrapper from '@/components/PageShimmerWrapper'
import { Shimmer, ShimmerChart } from '@/components/Shimmer'
import { useAILogs, DateRange } from '@/hooks/useAILogs'

function AISkeleton() {
  return (
    <>
      <div className="p-6 md:p-8 border-b border-border-dark/50 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-8 w-56" />
          <Shimmer className="h-4 w-80" />
        </div>
        <Shimmer className="h-10 w-28 rounded-lg" />
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-8 z-10 pt-6">
        <div className="flex flex-col gap-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <Shimmer className="h-4 w-40" />
                  <Shimmer className="h-10 w-20" />
                  <Shimmer className="h-6 w-16 rounded-md" />
                </div>
                <Shimmer className="h-32 w-32 rounded-full" />
              </div>
            ))}
          </div>
          <ShimmerChart height="h-64" />
          <div className="bg-card-dark rounded-xl border border-border-dark/50 p-6 flex flex-col gap-3">
            <Shimmer className="h-5 w-32" />
            <Shimmer className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </>
  )
}

export default function AIPerformancePage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d')

  const {
    logs,
    avgGptLatency,
    avgWhisperLatency,
    costData,
    totalCalls,
    successRate,
    isLoading,
  } = useAILogs(dateRange)

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <PageShimmerWrapper fallback={<AISkeleton />} isLoading={isLoading}>
          <AIPerformanceHeader totalCalls={totalCalls} successRate={successRate} />
          <div className="flex-1 overflow-y-auto px-8 pb-8 z-10 custom-scrollbar">
            <div className="flex flex-col gap-6 max-w-[1400px]">
              <PerformanceGauges
                avgGptLatency={avgGptLatency}
                avgWhisperLatency={avgWhisperLatency}
                isLoading={isLoading}
              />
              <CostChart
                costData={costData}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              <LiveTerminal logs={logs} isLoading={isLoading} />
            </div>
          </div>
        </PageShimmerWrapper>
      </main>
    </div>
  )
}
