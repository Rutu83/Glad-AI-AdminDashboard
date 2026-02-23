'use client'

import { useEffect, useState } from 'react'
import Icon from '../Icon'
import { getCampaigns } from '@/app/actions'
import { supabase } from '@/lib/supabase'

interface Campaign {
  id: string
  title: string
  topic: string // Audience
  created_at: string // Date Sent
  status: string
  // description, image_url, etc available but not shown in summary table
}

function getStatusBadge(status: string) {
  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus === 'sent') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
        Sent
      </span>
    )
  }

  if (normalizedStatus === 'scheduled') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
        Scheduled
      </span>
    )
  }

  if (normalizedStatus === 'failed') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
        Failed
      </span>
    )
  }

  // Fallback for other statuses
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20 capitalize">
      {status}
    </span>
  )
}

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}

interface CampaignHistoryProps {
  refreshTrigger?: number;
}

export default function CampaignHistory({ refreshTrigger = 0 }: CampaignHistoryProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalItems = campaigns.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentCampaigns = campaigns.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Initial fetch
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const data = await getCampaigns()
        setCampaigns(data as Campaign[])
      } catch (error) {
        console.error('Failed to load campaigns', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [refreshTrigger])

  // Real-time subscription
  useEffect(() => {
    const channelName = `campaigns_realtime_${Date.now()}`

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          console.log('[Realtime] New campaign received:', payload.new)
          const newCampaign = payload.new as Campaign
          setCampaigns((prev) => {
            // Avoid duplicates if the campaign was already added by the refresh trigger
            if (prev.some((c) => c.id === newCampaign.id)) return prev
            return [newCampaign, ...prev]
          })
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications' },
        (payload) => {
          console.log('[Realtime] Campaign updated:', payload.new)
          const updated = payload.new as Campaign
          setCampaigns((prev) =>
            prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
          )
        }
      )
      .subscribe((status) => {
        console.log('[Realtime] Campaign history subscription:', status)
      })

    return () => {
      channel.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-white text-xl font-bold px-1">Campaign History</h3>
        <div className="bg-card-dark rounded-xl border border-border-dark/50 p-8 flex justify-center text-text-secondary">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-white text-xl font-bold">Campaign History</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </div>
      <div className="bg-card-dark rounded-xl border border-border-dark/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-border-dark/50">
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Campaign Name</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Audience</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Date Sent</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider w-32">Open Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark/30">
              {currentCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-secondary">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                currentCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-white/[0.02] transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded flex items-center justify-center bg-primary/20 text-primary`}>
                          <Icon name="rocket" size={16} />
                        </div>
                        <span className="text-white font-medium text-sm">{campaign.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">{campaign.topic}</td>
                    <td className="p-4 text-text-secondary text-sm">{formatDate(campaign.created_at)}</td>
                    <td className="p-4">{getStatusBadge(campaign.status)}</td>
                    <td className="p-4">
                      <span className="text-text-secondary text-xs">-</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination / Footer of table */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 bg-black/20 border-t border-border-dark/50 gap-3">
          <p className="text-xs text-text-secondary">
            {totalItems > 0 ? (
              <>Showing <span className="text-white font-medium">{startIndex + 1}-{endIndex}</span> of <span className="text-white font-medium">{totalItems}</span> campaigns</>
            ) : (
              'No campaigns'
            )}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-md border border-border-dark/50 text-xs text-text-secondary hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-md border border-border-dark/50 text-xs text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
