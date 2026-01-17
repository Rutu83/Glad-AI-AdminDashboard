import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import UserFilters from '@/components/users/UserFilters'
import UserTable from '@/components/users/UserTable'
import Icon from '@/components/Icon'

export default function UsersPage() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
        {/* Background decoration glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[100px] pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <span>Admin</span>
                <Icon name="chevron_right" className="text-[16px]" />
                <span className="text-primary">Users</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">User Management</h2>
              <p className="text-gray-400">Manage user accounts, monitor plan usage, and oversee platform access.</p>
            </div>

            <UserFilters />
            <UserTable />
          </div>
        </div>
      </main>
    </div>
  )
}