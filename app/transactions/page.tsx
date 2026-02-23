import Sidebar from '@/components/Sidebar'
import TransactionHeader from '@/components/transactions/TransactionHeader'
import TransactionsManager from '@/components/transactions/TransactionsManager'
import TransactionTable from '@/components/transactions/TransactionTable'
import PageShimmerWrapper from '@/components/PageShimmerWrapper'
import { Shimmer, ShimmerTable } from '@/components/Shimmer'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

function TransactionsSkeleton() {
  return (
    <>
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
        <ShimmerTable rows={6} cols={7} />
      </div>
    </>
  )
}

export default async function TransactionsPage() {
  // Fetch transactions ordered by most recent first
  const { data: transactions, error: txnErr } = await supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false });

  // Fetch profiles for user info (name, avatar)
  const { data: profiles, error: profileErr } = await supabase
    .from('profiles')
    .select('uid, name, purl');

  if (txnErr) console.error('Error fetching transactions:', txnErr);
  if (profileErr) console.error('Error fetching profiles:', profileErr);

  // Build a plain object uid -> profile lookup map for serializing to client
  const profileMap: Record<string, { name: string; purl: string | null }> = {};
  (profiles || []).forEach((p) => {
    profileMap[p.uid] = { name: p.name, purl: p.purl };
  });

  // Map Supabase data to the TransactionTable interface
  const mappedTransactions = (transactions || []).map((txn) => {
    const profile = profileMap[txn.uid];

    // Format the timestamp  
    const date = new Date(txn.transaction_date);
    const timestamp = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    }) + ', ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    // Format amount with ₹ symbol
    const amount = `₹${Number(txn.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Map transaction type to status for display
    // income → success, expense → pending (to differentiate visually)
    const statusMap: Record<string, 'success' | 'pending' | 'failed'> = {
      income: 'success',
      expense: 'pending',
    };

    return {
      id: txn.id.toString(),
      timestamp,
      transactionId: `TXN-${String(txn.id).padStart(4, '0')}`,
      user: {
        name: profile?.name || 'Unknown User',
        avatar: profile?.purl || undefined,
      },
      type: (txn.creation_type === 'voice' ? 'voice' : 'manual') as 'voice' | 'manual',
      amount,
      category: txn.category || 'Other',
      status: statusMap[txn.type] || 'pending',
    };
  });

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <PageShimmerWrapper fallback={<TransactionsSkeleton />}>
          <TransactionsManager initialTransactions={mappedTransactions} profileMap={profileMap} />
        </PageShimmerWrapper>
      </main>
    </div>
  )
}
