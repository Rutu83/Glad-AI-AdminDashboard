'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import TransactionHeader from './TransactionHeader'
import TransactionTable, { Transaction } from './TransactionTable'

interface TransactionsManagerProps {
    initialTransactions: Transaction[]
    profileMap: Record<string, { name: string; purl: string | null }>
}

export default function TransactionsManager({
    initialTransactions,
    profileMap: initialProfileMap,
}: TransactionsManagerProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
    const [profileMap, setProfileMap] = useState<Record<string, { name: string; purl: string | null }>>(initialProfileMap)
    const [isRealTime, setIsRealTime] = useState(true)

    useEffect(() => {
        if (!isRealTime) return

        // Create a unique channel name to prevent conflicts
        const channelName = `transactions_realtime_${Date.now()}`

        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'transactions' },
                async (payload) => {
                    console.log('[Realtime] New transaction received:', payload.new)
                    const newTxn = payload.new

                    // Check if we have the profile in our map
                    let profile = profileMap[newTxn.uid]

                    // If not, fetch it from Supabase
                    if (!profile) {
                        try {
                            const { data, error } = await supabase
                                .from('profiles')
                                .select('name, purl')
                                .eq('uid', newTxn.uid)
                                .single()

                            if (!error && data) {
                                profile = { name: data.name, purl: data.purl }
                                setProfileMap((prev) => ({ ...prev, [newTxn.uid]: profile }))
                            }
                        } catch (err) {
                            console.error('Failed to fetch missing profile for new transaction', err)
                        }
                    }

                    // Format timestamp
                    const date = new Date(newTxn.transaction_date || newTxn.created_at || Date.now())
                    const timestamp =
                        date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                        }) +
                        ', ' +
                        date.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                        })

                    // Format amount
                    const amount = `₹${Number(newTxn.amount || 0).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`

                    const statusMap: Record<string, 'success' | 'pending' | 'failed'> = {
                        income: 'success',
                        expense: 'pending',
                    }

                    const formattedTxn: Transaction = {
                        id: newTxn.id.toString(),
                        timestamp,
                        transactionId: `TXN-${String(newTxn.id).padStart(4, '0')}`,
                        user: {
                            name: profile?.name || 'Unknown User',
                            avatar: profile?.purl || undefined,
                        },
                        type: (newTxn.creation_type === 'voice' ? 'voice' : 'manual') as 'voice' | 'manual',
                        amount,
                        category: newTxn.category || 'Other',
                        status: statusMap[newTxn.type] || 'pending',
                    }

                    // Prepend to list
                    setTransactions((prev) => [formattedTxn, ...prev])
                }
            )
            .subscribe((status) => {
                console.log('[Realtime] Transaction table subscription status:', status)
            })

        return () => {
            channel.unsubscribe()
        }
    }, [isRealTime, profileMap])

    return (
        <>
            <TransactionHeader isRealTime={isRealTime} setIsRealTime={setIsRealTime} />
            <TransactionTable transactions={transactions} />
        </>
    )
}
