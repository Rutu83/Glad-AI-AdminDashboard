import Icon from '../Icon'

export default function RevenueCharts({
  last6MonthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  monthlyPlanSales = [40, 55, 45, 70, 85, 60],
  yearlyPlanSales = [24, 33, 27, 42, 51, 36],
  methodDistribution = { upi: 58, card: 32, netBanking: 10 }
}: {
  last6MonthsLabels?: string[];
  monthlyPlanSales?: number[];
  yearlyPlanSales?: number[];
  methodDistribution?: { upi: number; card: number; netBanking: number; }
}) {
  // Normalize heights to percentages based on the maximum total sales in any month
  const maxTotalSales = Math.max(
    ...monthlyPlanSales.map((monthly, i) => Math.max(monthly, yearlyPlanSales[i])),
    100 // baseline fallback to avoid division by zero if all are 0
  );

  const getPercentage = (value: number) => {
    // 0 sales should reflect as min 2% height just so a bar dot is visible, up to 100%
    if (value === 0) return 2;
    return Math.min(Math.max((value / maxTotalSales) * 100, 2), 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart */}
      <div className="lg:col-span-2 rounded-2xl bg-card-dark border border-white/5 p-6 shadow-xl flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-white text-lg font-bold">Plan Sales Comparison</h3>
            <p className="text-text-secondary text-sm">Monthly vs Yearly Subscriptions</p>
          </div>
          <button className="text-primary hover:text-white transition-colors">
            <Icon name="more_horiz" />
          </button>
        </div>

        {/* Chart Visual */}
        <div className="flex-1 min-h-[240px] flex items-end justify-between gap-2 sm:gap-6 px-2">
          {last6MonthsLabels.map((month, index) => (
            <div key={`${month}-${index}`} className="flex flex-col items-center gap-3 w-full group cursor-pointer relative" title={`Monthly: $${monthlyPlanSales[index]} | Yearly: $${yearlyPlanSales[index]}`}>
              <div className="relative w-full flex justify-center gap-1 h-48 items-end">
                <div
                  className="w-3 sm:w-5 bg-primary rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                  style={{ height: `${getPercentage(monthlyPlanSales[index])}%` }}
                />
                <div
                  className="w-3 sm:w-5 bg-white/20 rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                  style={{ height: `${getPercentage(yearlyPlanSales[index])}%` }}
                />
              </div>
              <span className="text-text-secondary text-xs font-semibold">{month}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-primary"></div>
            <span className="text-text-secondary text-xs font-medium">Monthly Plan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-white/20"></div>
            <span className="text-text-secondary text-xs font-medium">Yearly Plan</span>
          </div>
        </div>
      </div>

      {/* Payment Methods Distribution */}
      <div className="lg:col-span-1 rounded-2xl bg-card-dark border border-white/5 p-6 shadow-xl flex flex-col">
        <h3 className="text-white text-lg font-bold mb-1">Payment Methods</h3>
        <p className="text-text-secondary text-sm mb-8">Transaction Volume Distribution</p>

        <div className="flex flex-col gap-8 justify-center flex-1">
          {/* UPI */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-500/20 text-blue-400">
                  <Icon name="qr_code_2" className="text-sm" />
                </div>
                <span className="text-white font-medium text-sm">UPI</span>
              </div>
              <span className="text-white font-bold">{Math.round(methodDistribution.upi)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${methodDistribution.upi}%` }}></div>
            </div>
          </div>

          {/* Card */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-primary/20 text-primary">
                  <Icon name="credit_card" className="text-sm" />
                </div>
                <span className="text-white font-medium text-sm">Card</span>
              </div>
              <span className="text-white font-bold">{Math.round(methodDistribution.card)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(127,13,242,0.5)]" style={{ width: `${methodDistribution.card}%` }}></div>
            </div>
          </div>

          {/* Net Banking */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-purple-400/20 text-purple-400">
                  <Icon name="account_balance" className="text-sm" />
                </div>
                <span className="text-white font-medium text-sm">Net Banking</span>
              </div>
              <span className="text-white font-bold">{Math.round(methodDistribution.netBanking)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" style={{ width: `${methodDistribution.netBanking}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}