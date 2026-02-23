'use client'

import { useState, useMemo } from 'react'
import UserFilters from './UserFilters'
import UserTable from './UserTable'

// Define the User interface here or import it if exported from UserTable
interface User {
    id: string
    name: string
    userId: string
    avatar: string
    plan: 'premium' | 'basic' | 'enterprise' | string
    status: 'active' | 'offline'
    usage: {
        used: number
        total: number
        percentage: number
    }
    joinedDate: string
}

interface UserManagerProps {
    initialUsers: User[]
}

export default function UserManager({ initialUsers }: UserManagerProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [planFilter, setPlanFilter] = useState('all')

    const filteredUsers = useMemo(() => {
        return initialUsers.filter(user => {
            // Search matching (name, ID - we don't have email in this interface yet, but could add it)
            const query = searchQuery.toLowerCase()
            const matchesSearch =
                user.name.toLowerCase().includes(query) ||
                user.userId.toLowerCase().includes(query)

            // Status matching
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter

            // Plan matching
            const matchesPlan = planFilter === 'all' || user.plan === planFilter

            return matchesSearch && matchesStatus && matchesPlan
        })
    }, [initialUsers, searchQuery, statusFilter, planFilter])

    return (
        <>
            <UserFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                planFilter={planFilter}
                onPlanChange={setPlanFilter}
            />
            <UserTable users={filteredUsers} />
        </>
    )
}
