'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icon'

export default function LoginPage() {
    const { signIn, isLoading, adminUser } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Redirect if already logged in
    if (!isLoading && adminUser) {
        router.replace('/')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        const result = await signIn(email, password)
        if (result.error) {
            setError(result.error)
            setIsSubmitting(false)
        }
        // If successful, the auth listener will set adminUser and trigger redirect
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/30" />
                    <div className="h-4 w-32 bg-white/10 rounded" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-purple-900 flex items-center justify-center shadow-neon mb-4">
                        <Icon name="smart_toy" className="text-white" size={28} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white neon-text">GLAD AI</h1>
                    <p className="text-gray-400 text-sm mt-1">Admin Control Panel</p>
                </div>

                {/* Card */}
                <div className="bg-sidebar-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-white">Welcome back</h2>
                        <p className="text-gray-400 text-sm mt-1">Sign in to access the admin dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5a7c]" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@gladai.com"
                                    required
                                    className="w-full bg-[#211b27] border border-[#302839] rounded-xl h-12 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-[#473b54]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5a7c]" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                    className="w-full bg-[#211b27] border border-[#302839] rounded-xl h-12 pl-12 pr-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-[#473b54]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b5a7c] hover:text-white transition-colors"
                                >
                                    <Icon name={showPassword ? 'visibility' : 'visibility_off'} size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                                <Icon name="error" size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-xl bg-primary hover:bg-[#6a0bcc] text-white font-semibold shadow-[0_0_20px_rgba(127,13,242,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 mt-2"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-gray-500 text-xs mt-6">
                        Protected admin access only. Unauthorized login attempts are logged.
                    </p>
                </div>

                {/* Bottom text */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    © 2026 GLAD AI · v2.0
                </p>
            </div>
        </div>
    )
}
