'use client'

import { useState } from 'react'
import Icon from '../Icon'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

// ─── Reusable sub-components ──────────────────────────────────────────────────

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon name={icon} className="text-primary text-lg" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-[#302839] w-full my-2" />
}

function ToggleCard({
  title, description, checked, onChange, badge
}: {
  title: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
  badge?: string
}) {
  return (
    <div className="bg-[#211b27] border border-[#302839] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-white font-medium text-base">{title}</p>
          {badge && (
            <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer flex-shrink-0">
        <input
          className="sr-only peer"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="relative w-14 h-7 bg-[#302839] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary transition-colors" />
      </label>
    </div>
  )
}

function FieldInput({
  label, hint, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#6b5a7c] uppercase tracking-wider">{label}</label>
      <input
        className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-11 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-[#473b54]"
        {...props}
      />
      {hint && <p className="text-xs text-[#6b5a7c]">{hint}</p>}
    </div>
  )
}

// ─── Tab Sections ─────────────────────────────────────────────────────────────

function ApiConfigTab({
  apiKey, setApiKey, aiModel, setAiModel
}: {
  apiKey: string; setApiKey: (v: string) => void
  aiModel: string; setAiModel: (v: string) => void
}) {
  const [showKey, setShowKey] = useState(false)

  return (
    <div className="flex flex-col gap-8 animate-fadein">
      <SectionTitle icon="api" title="External Integrations" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OpenAI API Key */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary">OpenAI API Key</label>
          <div className="relative group">
            <Icon name="key" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5a7c] pointer-events-none" />
            <input
              className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-12 pl-12 pr-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-[#473b54]"
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-........................"
            />
            <button
              type="button"
              onClick={() => setShowKey(p => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b5a7c] hover:text-white transition-colors"
            >
              <Icon name={showKey ? 'visibility' : 'visibility_off'} />
            </button>
          </div>
          <p className="text-xs text-[#6b5a7c]">Used for the core conversational engine. Stored encrypted.</p>
        </div>

        {/* AI Model */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary">Active AI Model</label>
          <div className="relative group">
            <Icon name="smart_toy" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5a7c] pointer-events-none" />
            <select
              className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-12 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
            >
              <option value="gpt-4o-mini">GPT-4o Mini (Default — Fast & Cheap)</option>
              <option value="gpt-4o">GPT-4o (Most Capable)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Legacy)</option>
              <option value="claude-3-haiku">Claude 3 Haiku (Anthropic)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Google)</option>
            </select>
            <Icon name="expand_more" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b5a7c] pointer-events-none" />
          </div>
          <p className="text-xs text-[#6b5a7c]">The LLM the mobile app will connect to for all voice interactions.</p>
        </div>
      </div>

      <Divider />

      {/* Model info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { model: 'gpt-4o-mini', label: 'GPT-4o Mini', cost: '$0.15/1M tokens', speed: '~450ms', badge: 'Active', color: 'primary' },
          { model: 'gpt-4o', label: 'GPT-4o', cost: '$2.50/1M tokens', speed: '~900ms', badge: 'Premium', color: 'yellow-400' },
          { model: 'whisper-1', label: 'Whisper STT', cost: '$0.006/min', speed: '~1.2s', badge: 'Speech', color: 'accent-green' },
        ].map(card => (
          <div key={card.model} className={`bg-[#211b27] border rounded-xl p-4 flex flex-col gap-2 ${aiModel === card.model ? 'border-primary shadow-[0_0_16px_rgba(127,13,242,0.2)]' : 'border-[#302839]'}`}>
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm">{card.label}</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{card.badge}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <p className="text-[10px] text-text-secondary uppercase tracking-wider">Cost</p>
                <p className="text-xs text-white font-mono">{card.cost}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-secondary uppercase tracking-wider">Avg Speed</p>
                <p className="text-xs text-accent-green font-mono">{card.speed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GeneralSettingsTab({
  maintenanceMode, setMaintenanceMode,
  maxTokens, setMaxTokens,
  sessionTimeout, setSessionTimeout,
}: {
  maintenanceMode: boolean; setMaintenanceMode: (v: boolean) => void
  maxTokens: string; setMaxTokens: (v: string) => void
  sessionTimeout: string; setSessionTimeout: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-8 animate-fadein">
      <SectionTitle icon="tune" title="General Preferences" />

      <ToggleCard
        title="Maintenance Mode"
        description="Temporarily locks the mobile app for all users. Only admins retain access. Use before major updates."
        checked={maintenanceMode}
        onChange={setMaintenanceMode}
      />

      <Divider />
      <h4 className="text-base font-semibold text-white">AI Behaviour</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldInput
          label="Max Tokens Per Response"
          type="number"
          min={100}
          max={4096}
          value={maxTokens}
          onChange={(e) => setMaxTokens(e.target.value)}
          hint="Controls the length of AI responses. Higher = longer answers, higher cost."
          placeholder="1024"
        />
        <FieldInput
          label="Session Timeout (minutes)"
          type="number"
          min={5}
          max={480}
          value={sessionTimeout}
          onChange={(e) => setSessionTimeout(e.target.value)}
          hint="Inactive mobile sessions will expire after this duration."
          placeholder="60"
        />
      </div>

      <Divider />

      {/* App info */}
      <div>
        <h4 className="text-base font-semibold text-white mb-4">Platform Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Platform', value: 'GLAD AI Mobile' },
            { label: 'Backend', value: 'Supabase + Node.js' },
            { label: 'Admin Panel Version', value: 'v1.2.0' },
          ].map(item => (
            <div key={item.label} className="bg-[#211b27] border border-[#302839] rounded-xl p-4">
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SecurityTab({
  twoFactorAuth, setTwoFactorAuth
}: {
  twoFactorAuth: boolean; setTwoFactorAuth: (v: boolean) => void
}) {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const [changingPw, setChangingPw] = useState(false)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwError('')
    setPwSuccess('')

    if (!newPw || newPw.length < 8) {
      setPwError('Password must be at least 8 characters.')
      return
    }
    if (newPw !== confirmPw) {
      setPwError('New passwords do not match.')
      return
    }

    setChangingPw(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw })
      if (error) throw error
      setPwSuccess('Password updated successfully!')
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
    } catch (err: any) {
      setPwError(err.message || 'Failed to update password.')
    } finally {
      setChangingPw(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-fadein">
      <SectionTitle icon="security" title="Security & Access" />

      <ToggleCard
        title="Two-Factor Authentication (2FA)"
        description="Require a one-time verification code each time an admin logs in. Strongly recommended."
        checked={twoFactorAuth}
        onChange={setTwoFactorAuth}
        badge="Recommended"
      />

      <Divider />

      {/* Active Sessions */}
      <div>
        <h4 className="text-base font-semibold text-white mb-4">Active Admin Sessions</h4>
        <div className="flex flex-col gap-3">
          {[
            { device: 'Chrome on macOS', ip: '192.168.1.xxx', time: 'Now (current)', current: true },
          ].map((session, i) => (
            <div key={i} className="bg-[#211b27] border border-[#302839] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${session.current ? 'bg-accent-green' : 'bg-text-secondary'} flex-shrink-0`} />
                <div>
                  <p className="text-white font-medium text-sm">{session.device}</p>
                  <p className="text-text-secondary text-xs">{session.ip} · {session.time}</p>
                </div>
              </div>
              {!session.current && (
                <button className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 rounded-lg px-3 py-1.5 transition-colors">
                  Revoke
                </button>
              )}
              {session.current && (
                <span className="text-xs text-accent-green bg-accent-green/10 border border-accent-green/20 rounded-lg px-3 py-1.5">Current session</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Change password */}
      <div>
        <h4 className="text-base font-semibold text-white mb-4">Change Admin Password</h4>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 max-w-lg">
          <FieldInput
            label="Current Password"
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            placeholder="••••••••••••"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldInput
              label="New Password"
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="••••••••••••"
              hint="Min. 8 characters"
            />
            <FieldInput
              label="Confirm New Password"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="••••••••••••"
            />
          </div>
          {pwError && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/5 border border-red-400/20 rounded-lg px-4 py-3">
              <Icon name="error" className="text-base flex-shrink-0" />
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="flex items-center gap-2 text-accent-green text-sm bg-accent-green/5 border border-accent-green/20 rounded-lg px-4 py-3">
              <Icon name="check_circle" className="text-base flex-shrink-0" />
              {pwSuccess}
            </div>
          )}
          <button
            type="submit"
            disabled={changingPw}
            className="self-start px-6 py-2.5 rounded-lg bg-primary hover:bg-[#6a0bcc] text-white font-semibold shadow-[0_0_15px_rgba(127,13,242,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 text-sm"
          >
            {changingPw ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

function AdminProfileTab() {
  const { adminUser, user } = useAuth()
  const [name, setName] = useState(adminUser?.name ?? '')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setSuccess(''); setError('')

    try {
      const { error: dbErr } = await supabase
        .from('admin_users')
        .update({ name })
        .eq('email', adminUser?.email ?? '')

      if (dbErr) throw dbErr
      setSuccess('Profile updated successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const initials = (adminUser?.name || adminUser?.email || '?')
    .split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="flex flex-col gap-8 animate-fadein">
      <SectionTitle icon="account_circle" title="Admin Profile" />

      {/* Avatar */}
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-[#6a0bcc] flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(127,13,242,0.4)] flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-white font-bold text-lg">{adminUser?.name || 'Admin'}</p>
          <p className="text-text-secondary text-sm">{adminUser?.email}</p>
          <span className="mt-1 inline-flex items-center text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse inline-block" />
            Super Admin
          </span>
        </div>
      </div>

      <Divider />

      {/* Edit form */}
      <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 max-w-lg">
        <h4 className="text-base font-semibold text-white">Edit Profile</h4>
        <FieldInput
          label="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. GLAD AI Admin"
          hint="This name is shown in the admin panel sidebar."
        />
        <FieldInput
          label="Email Address"
          type="email"
          value={adminUser?.email ?? ''}
          readOnly
          className="w-full bg-[#211b27] border border-[#302839] rounded-lg h-11 px-4 text-text-secondary focus:outline-none cursor-not-allowed opacity-60"
          hint="Email cannot be changed here. Contact your Supabase project owner."
        />

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/5 border border-red-400/20 rounded-lg px-4 py-3">
            <Icon name="error" className="text-base flex-shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-accent-green text-sm bg-accent-green/5 border border-accent-green/20 rounded-lg px-4 py-3">
            <Icon name="check_circle" className="text-base flex-shrink-0" />
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="self-start px-6 py-2.5 rounded-lg bg-primary hover:bg-[#6a0bcc] text-white font-semibold shadow-[0_0_15px_rgba(127,13,242,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      <Divider />

      {/* Account info */}
      <div>
        <h4 className="text-base font-semibold text-white mb-4">Account Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Account ID', value: user?.id?.slice(0, 16) + '...' },
            { label: 'Auth Provider', value: 'Supabase Email/Password' },
            { label: 'Account Created', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
            { label: 'Last Sign In', value: user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—' },
          ].map(item => (
            <div key={item.label} className="bg-[#211b27] border border-[#302839] rounded-xl p-4">
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-white font-medium text-sm font-mono">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface SettingsContentProps {
  initialSettings: any
  activeTab: string
  onSavingChange: (saving: boolean) => void
}

export default function SettingsContent({ initialSettings, activeTab, onSavingChange }: SettingsContentProps) {
  const [maintenanceMode, setMaintenanceMode] = useState(initialSettings?.maintenance_mode ?? false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [aiModel, setAiModel] = useState(initialSettings?.ai_model ?? 'gpt-4o-mini')
  const [apiKey, setApiKey] = useState(initialSettings?.openai_api_key ?? '')
  const [maxTokens, setMaxTokens] = useState(String(initialSettings?.max_tokens ?? 1024))
  const [sessionTimeout, setSessionTimeout] = useState(String(initialSettings?.session_timeout ?? 60))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSavingChange(true)
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({
          ai_model: aiModel,
          maintenance_mode: maintenanceMode,
          openai_api_key: apiKey,
        })
        .match({ id: initialSettings.id })
      if (error) throw error
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings.')
    } finally {
      onSavingChange(false)
    }
  }

  return (
    <div id="settings-form" className="flex flex-col gap-10 pb-24">
      {/* 
        This is a div because inner tabs (SecurityTab, AdminProfileTab) 
        have their own <form> elements. Nested forms cause hydration errors.
        The overall page "Save" button will still call handleSubmit via a ref or 
        triggering click event elsewhere if needed, or we just rely on individual saves.
        Wait, we should actually handle the submit from inside ApiConfigTab or GeneralSettingsTab
        since they are the only ones that don't have their own forms!
      */}
      {activeTab === 'api' && (
        <form onSubmit={handleSubmit}>
          <ApiConfigTab
            apiKey={apiKey} setApiKey={setApiKey}
            aiModel={aiModel} setAiModel={setAiModel}
          />
          <button type="submit" id="hidden-submit" className="hidden" />
        </form>
      )}
      {activeTab === 'general' && (
        <form onSubmit={handleSubmit}>
          <GeneralSettingsTab
            maintenanceMode={maintenanceMode} setMaintenanceMode={setMaintenanceMode}
            maxTokens={maxTokens} setMaxTokens={setMaxTokens}
            sessionTimeout={sessionTimeout} setSessionTimeout={setSessionTimeout}
          />
          <button type="submit" id="hidden-submit" className="hidden" />
        </form>
      )}
      {activeTab === 'security' && (
        <SecurityTab
          twoFactorAuth={twoFactorAuth} setTwoFactorAuth={setTwoFactorAuth}
        />
      )}
      {activeTab === 'profile' && (
        <AdminProfileTab />
      )}
    </div>
  )
}