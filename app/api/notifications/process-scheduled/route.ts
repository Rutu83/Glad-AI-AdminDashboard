
import { NextResponse } from 'next/server';
import { messaging } from '@/lib/firebase-admin';
import { supabase } from '@/lib/supabase';

export async function POST() {
    try {
        const now = new Date().toISOString();

        // Find all notifications that are scheduled and whose time has passed
        const { data: pendingNotifications, error: fetchError } = await supabase
            .from('notifications')
            .select('*')
            .eq('status', 'scheduled')
            .lte('scheduled_for', now);

        if (fetchError) {
            console.error('Error fetching scheduled notifications:', fetchError);
            return NextResponse.json({ error: 'Failed to fetch scheduled notifications' }, { status: 500 });
        }

        if (!pendingNotifications || pendingNotifications.length === 0) {
            return NextResponse.json({ success: true, processed: 0, message: 'No scheduled notifications to process' });
        }

        let processed = 0;
        let failed = 0;

        for (const notification of pendingNotifications) {
            try {
                // Build FCM message
                const notificationPayload: any = {
                    title: notification.title || 'New Notification',
                    body: notification.description,
                };

                const dataPayload: any = {};

                if (notification.image_url) {
                    notificationPayload.imageUrl = notification.image_url;
                    dataPayload.image = notification.image_url;
                }

                const message: any = {
                    notification: notificationPayload,
                    data: dataPayload,
                    topic: notification.topic || 'all_users',
                };

                // Send via FCM
                await messaging.send(message);

                // Update status to 'sent'
                await supabase
                    .from('notifications')
                    .update({ status: 'sent' })
                    .eq('id', notification.id);

                processed++;
                console.log(`[Scheduler] Sent notification ${notification.id}: "${notification.title}"`);

            } catch (sendError) {
                console.error(`[Scheduler] Failed to send notification ${notification.id}:`, sendError);

                // Mark as failed
                await supabase
                    .from('notifications')
                    .update({ status: 'failed' })
                    .eq('id', notification.id);

                failed++;
            }
        }

        return NextResponse.json({
            success: true,
            processed,
            failed,
            total: pendingNotifications.length,
        });

    } catch (error) {
        console.error('[Scheduler] Unexpected error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
