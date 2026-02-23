
'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function getCampaigns() {
    try {
        const { data, error } = await supabaseAdmin
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching campaigns:', error)
            return []
        }

        return data || []
    } catch (error) {
        console.error('Unexpected error fetching campaigns:', error)
        return []
    }
}
