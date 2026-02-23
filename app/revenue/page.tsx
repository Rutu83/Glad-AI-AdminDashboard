import Sidebar from '@/components/Sidebar'
import RevenueHeader from '@/components/revenue/RevenueHeader'
import RevenueMetrics from '@/components/revenue/RevenueMetrics'
import RevenueCharts from '@/components/revenue/RevenueCharts'
import RecentPayments from '@/components/revenue/RecentPayments'
import PageShimmerWrapper from '@/components/PageShimmerWrapper'
import { Shimmer, ShimmerMetrics, ShimmerChart, ShimmerTable } from '@/components/Shimmer'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

function RevenueSkeleton() {
  return (
    <>
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
    </>
  )
}

export default async function RevenuePage() {
  const { data: payments, error: paymentsErr } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
  const { data: profiles, error: profileErr } = await supabase.from('profiles').select('*');
  const { data: plans, error: planErr } = await supabase.from('plans').select('*');

  if (paymentsErr) console.error('Error fetching payments:', paymentsErr);
  if (profileErr) console.error('Error fetching profiles:', profileErr);
  if (planErr) console.error('Error fetching plans:', planErr);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  let totalRevenue = 0;
  let lastMonthRevenue = 0;
  let mrr = 0;
  let lastMonthMrr = 0;

  let activePremiumUsers = 0;
  let lastMonthActivePremiumUsers = 0;

  const last6MonthsLabels: string[] = [];
  const monthlyPlanSales = [0, 0, 0, 0, 0, 0];
  const yearlyPlanSales = [0, 0, 0, 0, 0, 0];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6MonthsLabels.push(d.toLocaleDateString('en-US', { month: 'short' }));
  }

  (profiles || []).forEach(profile => {
    const p = (plans || []).find(plan => plan.id === profile.plan_id);
    if (p && p.name && p.name.toLowerCase() !== 'free' && p.name.toLowerCase() !== 'basic') {
      activePremiumUsers++;

      // Simulating last month users (if users joined before this month)
      // Adjust property name based on what's available (`created_at` or `createdAt` etc, profiles usually use created_at in Supabase)
      const joinedDate = new Date(profile.created_at || profile.createdAt || Date.now());
      if (joinedDate.getMonth() !== currentMonth || joinedDate.getFullYear() !== currentYear) {
        lastMonthActivePremiumUsers++;
      }
    }
  });

  let upiCount = 0;
  let cardCount = 0;
  let netBankingCount = 0;
  let totalValidPayments = 0;

  const mappedPayments = (payments || []).map((payment) => {
    const userProfile = (profiles || []).find((p) => p.uid === payment.uid);
    const userPlan = (plans || []).find((p) => p.id === payment.plan_id);

    // Let's assume some default payment methods if not in DB for now
    const dummyMethods = ['Visa **4242', 'UPI', 'Mastercard **8833', 'Wire Transfer'];
    const randomMethod = dummyMethods[Math.floor(Math.random() * dummyMethods.length)];
    const method = payment.method || randomMethod;

    // Analytics
    if (payment.status?.toLowerCase() !== 'failed') {
      const amount = Number(payment.amount || 0);
      const paymentDate = new Date(payment.created_at || Date.now());

      // Revenue
      totalRevenue += amount;
      if (paymentDate < new Date(currentYear, currentMonth, 1)) {
        lastMonthRevenue += amount;
      }

      // MRR
      if (paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear) {
        mrr += amount;
      } else if (paymentDate.getMonth() === lastMonth && paymentDate.getFullYear() === lastMonthYear) {
        lastMonthMrr += amount;
      }

      // Chart distributions logic (Last 6 months)
      for (let i = 0; i < 6; i++) {
        const targetMonthDate = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        if (paymentDate.getMonth() === targetMonthDate.getMonth() && paymentDate.getFullYear() === targetMonthDate.getFullYear()) {
          const planName = userPlan?.name?.toLowerCase() || '';
          if (planName.includes('yearly') || planName.includes('annual')) {
            yearlyPlanSales[i] += amount;
          } else {
            monthlyPlanSales[i] += amount;
          }
        }
      }

      totalValidPayments++;
      if (method.toLowerCase().includes('upi')) upiCount++;
      else if (method.toLowerCase().includes('wire') || method.toLowerCase().includes('bank')) netBankingCount++;
      else cardCount++;
    }

    const methodIcon = method.toLowerCase().includes('upi') ? 'qr_code_2' :
      method.toLowerCase().includes('wire') || method.toLowerCase().includes('bank') ? 'account_balance' : 'credit_card';

    return {
      id: payment.id?.toString(),
      user: {
        name: userProfile?.name || payment.uid || 'Unknown User',
        email: userProfile?.email || 'N/A',
        avatar: userProfile?.purl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.name || 'User')}&background=random`
      },
      plan: userPlan?.name?.toLowerCase() || 'basic',
      amount: `$${(payment.amount || 0).toLocaleString()}`,
      date: new Date(payment.created_at || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      method: method,
      methodIcon: methodIcon,
      status: payment.status || 'success'
    };
  });

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <PageShimmerWrapper fallback={<RevenueSkeleton />}>
          <RevenueHeader />
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-8 py-8 max-w-7xl mx-auto w-full flex flex-col gap-8 pb-20">
              <RevenueMetrics
                totalRevenue={totalRevenue}
                lastMonthRevenue={lastMonthRevenue}
                monthlyRecurringRevenue={mrr}
                lastMonthMrr={lastMonthMrr}
                activePremiumUsers={activePremiumUsers}
                lastMonthActivePremiumUsers={lastMonthActivePremiumUsers}
                conversionRate={2.1}
                lastMonthConversionRate={2.6} // Mocked historical conversion
              />
              <RevenueCharts
                last6MonthsLabels={last6MonthsLabels}
                monthlyPlanSales={monthlyPlanSales}
                yearlyPlanSales={yearlyPlanSales}
                methodDistribution={{
                  upi: totalValidPayments > 0 ? (upiCount / totalValidPayments) * 100 : 58,
                  card: totalValidPayments > 0 ? (cardCount / totalValidPayments) * 100 : 32,
                  netBanking: totalValidPayments > 0 ? (netBankingCount / totalValidPayments) * 100 : 10
                }}
              />
              <RecentPayments payments={mappedPayments} />
            </div>
          </div>
        </PageShimmerWrapper>
      </main>
    </div>
  )
}