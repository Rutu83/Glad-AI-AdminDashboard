import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import UserManager from '@/components/users/UserManager'
import Icon from '@/components/Icon'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  // Fetch profiles and explicitly join with plans using foreign key or manual mapping
  // Since we aren't sure of the exact foreign key relation, let's fetch both or try a join
  // Assumes a typical Supabase one-to-one or many-to-one using 'uid' or similar if they are linked.
  // Actually, let's fetch both tables and map them based on 'uid' since they share it (from the inspect script output).
  const { data: profiles, error: profileErr } = await supabase.from('profiles').select('*');
  const { data: plans, error: planErr } = await supabase.from('plans').select('*');

  if (profileErr) console.error('Error fetching profiles:', profileErr);
  if (planErr) console.error('Error fetching plans:', planErr);

  const mappedUsers = (profiles || []).map((profile) => {
    // Find matching plan by planId
    const userPlan = (plans || []).find((p) => p.id === profile.planId);

    // Calculate usage safely
    const used = userPlan?.token || 0;
    const total = userPlan?.total_tokens || 10000;
    let percentage = 0;
    if (total > 0) {
      percentage = Math.round((used / total) * 100);
      percentage = percentage > 100 ? 100 : percentage;
    }

    return {
      id: profile.id?.toString() || profile.uid || Math.random().toString(),
      name: profile.name || 'Unknown User',
      userId: profile.uid?.substring(0, 10) || 'N/A',
      avatar: profile.purl || '',
      plan: userPlan?.name?.toLowerCase() || 'basic',
      status: userPlan?.status || 'active',
      usage: {
        used: Number(used),
        total: Number(total),
        percentage: Number(percentage)
      },
      joinedDate: new Date(profile.createdAt || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    };
  });

  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[100px] pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl flex flex-col gap-6 md:gap-8 pt-12 md:pt-0">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <span>Admin</span>
                <Icon name="chevron_right" className="text-[16px]" />
                <span className="text-primary">Users</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">User Management</h2>
              <p className="text-gray-400 text-sm md:text-base">Manage user accounts, monitor plan usage, and oversee platform access.</p>
            </div>

            <UserManager initialUsers={mappedUsers as any} />
          </div>
        </div>
      </main>
    </div>
  )
}