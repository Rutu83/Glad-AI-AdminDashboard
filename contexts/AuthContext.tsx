'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'

interface AdminUser {
    id: string
    email: string
    name: string
    avatar_url: string | null
}

interface AuthContextType {
    session: Session | null
    user: User | null
    adminUser: AdminUser | null
    isLoading: boolean
    signIn: (email: string, password: string) => Promise<{ error: string | null }>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchAdminUser(session.user.email!)
            } else {
                setIsLoading(false)
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchAdminUser(session.user.email!)
            } else {
                setAdminUser(null)
                setIsLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    async function fetchAdminUser(email: string) {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('email', email)
                .single()

            if (data && !error) {
                setAdminUser(data as AdminUser)
            } else {
                // User is authenticated but not an admin — sign them out
                await supabase.auth.signOut()
                setAdminUser(null)
            }
        } catch {
            setAdminUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    async function signIn(email: string, password: string): Promise<{ error: string | null }> {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) return { error: error.message }
            return { error: null }
        } catch (e: any) {
            return { error: e.message || 'An unexpected error occurred' }
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        setSession(null)
        setUser(null)
        setAdminUser(null)
    }

    return (
        <AuthContext.Provider value={{ session, user, adminUser, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
