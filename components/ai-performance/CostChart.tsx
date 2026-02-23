'use client'

import { useState, useRef, useCallback } from 'react'
import Icon from '../Icon'
import { CostDataPoint, DateRange } from '@/hooks/useAILogs'

interface CostChartProps {
  costData: CostDataPoint[]
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

interface TooltipState {
  visible: boolean
  x: number
  y: number
  dataPoint: CostDataPoint | null
}

const DATE_RANGE_LABELS: Record<DateRange, string> = {
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
}

export default function CostChart({ costData, dateRange, onDateRangeChange }: CostChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, dataPoint: null })
  const [showDropdown, setShowDropdown] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const maxCost = Math.max(
    ...costData.map(d => d.gptCost),
    ...costData.map(d => d.whisperCost),
    0.01
  ) * 1.15 // 15% headroom

  function generatePath(type: 'gptCost' | 'whisperCost', isArea = false): string {
    if (!costData || costData.length < 2) return ''

    const width = 1000
    const height = 200
    const stepX = width / (costData.length - 1)

    let path = `M 0 ${height - (costData[0][type] / maxCost) * height}`

    for (let i = 1; i < costData.length; i++) {
      const prevX = (i - 1) * stepX
      const prevY = height - (costData[i - 1][type] / maxCost) * height
      const x = i * stepX
      const y = height - (costData[i][type] / maxCost) * height
      const cx = (prevX + x) / 2
      path += ` Q ${cx} ${prevY}, ${x} ${y}`
    }

    if (isArea) path += ` V ${height} H 0 Z`

    return path
  }

  // Compute where to place the hover-line and which data point is closest
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || costData.length === 0) return

    const rect = svgRef.current.getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * 1000
    const stepX = 1000 / (costData.length - 1)
    const idx = Math.round(svgX / stepX)
    const clamped = Math.max(0, Math.min(idx, costData.length - 1))

    // Tooltip position in DOM space
    const tooltipX = e.clientX - rect.left
    const tooltipY = e.clientY - rect.top

    setTooltip({ visible: true, x: tooltipX, y: tooltipY, dataPoint: costData[clamped] })
  }, [costData, maxCost])

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  // Vertical line position in SVG coordinates
  const hoverLineX = tooltip.visible && tooltip.dataPoint
    ? (() => {
      const idx = costData.findIndex(d => d.date === tooltip.dataPoint!.date)
      return idx >= 0 ? (idx / (costData.length - 1)) * 1000 : -1
    })()
    : -1

  // Dot Y positions
  function dotY(type: 'gptCost' | 'whisperCost') {
    if (!tooltip.dataPoint) return 0
    return 200 - (tooltip.dataPoint[type] / maxCost) * 200
  }

  const whisperPathLine = generatePath('whisperCost')
  const whisperPathArea = generatePath('whisperCost', true)
  const gptPathLine = generatePath('gptCost')
  const gptPathArea = generatePath('gptCost', true)

  // Y-axis labels
  const ySteps = [maxCost, maxCost * 0.75, maxCost * 0.5, maxCost * 0.25, 0]

  // X-axis labels — show only every Nth label to avoid crowding
  const showEvery = costData.length <= 7 ? 1 : costData.length <= 30 ? Math.ceil(costData.length / 7) : Math.ceil(costData.length / 6)
  const xLabels = costData.filter((_, i) => i === 0 || i === costData.length - 1 || i % showEvery === 0)

  return (
    <div className="rounded-2xl border border-border-dark bg-card-dark p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Daily API Cost Breakdown</h2>
          <p className="text-sm text-text-secondary">
            GPT-4o-mini vs Whisper-v2 usage costs ({DATE_RANGE_LABELS[dateRange]})
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgba(127,13,242,0.6)]"></span>
            <span className="text-sm font-medium text-white">GPT-4o-mini</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent-green shadow-[0_0_8px_rgba(11,218,115,0.6)]"></span>
            <span className="text-sm font-medium text-white">Whisper-v2</span>
          </div>

          {/* Date Range Picker */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(p => !p)}
              className="flex items-center gap-2 rounded-lg bg-[#302839] px-3 py-1.5 text-sm font-medium text-white hover:bg-border-dark transition-colors"
            >
              <span>{DATE_RANGE_LABELS[dateRange]}</span>
              <Icon name="expand_more" className={`text-sm transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-[#1a1226] border border-[#302839] rounded-xl shadow-2xl overflow-hidden min-w-[140px]">
                {(Object.keys(DATE_RANGE_LABELS) as DateRange[]).map(range => (
                  <button
                    key={range}
                    onClick={() => { onDateRangeChange(range); setShowDropdown(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${dateRange === range ? 'text-primary font-semibold bg-primary/10' : 'text-white'}`}
                  >
                    {DATE_RANGE_LABELS[range]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-[10px] text-text-secondary pr-2 w-10">
          {ySteps.map((v, i) => (
            <span key={i} className="text-right leading-none">${v.toFixed(2)}</span>
          ))}
        </div>

        <div className="relative h-64 w-full pl-10">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-[#302839]/50 w-full"></div>
            ))}
          </div>

          {costData.length >= 2 ? (
            <svg
              ref={svgRef}
              className="absolute inset-0 h-full w-full overflow-visible cursor-crosshair"
              preserveAspectRatio="none"
              viewBox="0 0 1000 200"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7f0df2" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7f0df2" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientSecondary" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0bda73" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0bda73" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Whisper area + line */}
              <path d={whisperPathArea} fill="url(#gradientSecondary)" />
              <path d={whisperPathLine} fill="none" stroke="#0bda73" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="drop-shadow-[0_0_4px_rgba(11,218,115,0.4)]" />

              {/* GPT area + line */}
              <path d={gptPathArea} fill="url(#gradientPrimary)" />
              <path d={gptPathLine} fill="none" stroke="#7f0df2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="drop-shadow-[0_0_6px_rgba(127,13,242,0.5)]" />

              {/* Hover vertical line */}
              {tooltip.visible && hoverLineX >= 0 && (
                <>
                  <line
                    x1={hoverLineX} y1="0" x2={hoverLineX} y2="200"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  {/* GPT dot */}
                  <circle cx={hoverLineX} cy={dotY('gptCost')} r="5" fill="#7f0df2" stroke="white" strokeWidth="2" />
                  {/* Whisper dot */}
                  <circle cx={hoverLineX} cy={dotY('whisperCost')} r="5" fill="#0bda73" stroke="white" strokeWidth="2" />
                </>
              )}
            </svg>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">
              No data available for this period
            </div>
          )}

          {/* Tooltip */}
          {tooltip.visible && tooltip.dataPoint && (
            <div
              className="pointer-events-none absolute z-50 bg-[#1a1226]/95 backdrop-blur-md border border-[#302839] rounded-xl px-4 py-3 shadow-2xl text-xs min-w-[160px]"
              style={{
                left: tooltip.x + (tooltip.x > (svgRef.current?.getBoundingClientRect().width || 500) / 2 ? -180 : 16),
                top: Math.max(0, tooltip.y - 60),
              }}
            >
              <p className="text-text-secondary font-semibold mb-2 border-b border-white/10 pb-1.5">{tooltip.dataPoint.date}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary inline-block"></span>
                    <span className="text-white">GPT-4o-mini</span>
                  </span>
                  <span className="text-primary font-mono font-semibold">${tooltip.dataPoint.gptCost.toFixed(4)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent-green inline-block"></span>
                    <span className="text-white">Whisper-v2</span>
                  </span>
                  <span className="text-accent-green font-mono font-semibold">${tooltip.dataPoint.whisperCost.toFixed(4)}</span>
                </div>
                <div className="border-t border-white/10 mt-1 pt-1.5 flex items-center justify-between">
                  <span className="text-text-secondary">Total</span>
                  <span className="text-white font-mono font-bold">${(tooltip.dataPoint.gptCost + tooltip.dataPoint.whisperCost).toFixed(4)}</span>
                </div>
                {(tooltip.dataPoint.gptCalls > 0 || tooltip.dataPoint.whisperCalls > 0) && (
                  <div className="text-text-secondary mt-0.5">
                    {tooltip.dataPoint.gptCalls} GPT · {tooltip.dataPoint.whisperCalls} Whisper calls
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* X-axis labels */}
        <div className="mt-2 flex justify-between pl-10 pr-0 text-xs font-medium text-text-secondary">
          {xLabels.map((d) => (
            <span key={d.date}>{d.date}</span>
          ))}
        </div>
      </div>
    </div>
  )
}