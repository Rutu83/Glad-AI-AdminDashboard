
import { NextResponse } from 'next/server';
import { messaging } from '@/lib/firebase-admin';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { title, body, token, topic, image, scheduledFor } = await request.json();

        if (!token && !topic) {
            return NextResponse.json({ error: 'FCM Token or Topic is required' }, { status: 400 });
        }

        // 1. Handle Scheduled Notifications
        if (scheduledFor) {
            const { data, error } = await supabase
                .from('notifications')
                .insert([
                    {
                        title: title || 'New Notification',
                        description: body,
                        image_url: image || null,
                        scheduled_for: scheduledFor,
                        topic: topic || 'all_users',
                        status: 'scheduled',
                        type: 'general',
                        // created_at is auto
                    }
                ])
                .select();

            if (error) {
                console.error('Error scheduling notification:', error);
                return NextResponse.json({ error: 'Error scheduling notification', details: error }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: 'Notification scheduled', data });
        }

        // 2. Handle Immediate Notifications (Send Now)
        const notificationPayload: any = {
            title: title || 'New Notification',
            body: body,
        };

        const dataPayload: any = {};

        if (image) {
            notificationPayload.imageUrl = image;
            dataPayload.image = image;
        }

        const message: any = {
            notification: notificationPayload,
            data: dataPayload,
        };

        if (topic) {
            message.topic = topic;
        } else {
            message.token = token;
        }

        // Send to Firebase
        const response = await messaging.send(message);

        // Log to Supabase History
        const { error: dbError } = await supabase
            .from('notifications')
            .insert([
                {
                    title: title || 'New Notification',
                    description: body,
                    image_url: image || null,
                    scheduled_for: null,
                    topic: topic || 'all_users',
                    status: 'sent',
                    type: 'general',
                }
            ]);

        if (dbError) {
            console.error('Error logging notification to DB:', dbError);
            // We don't fail the request if DB log fails, but we log it.
        }

        console.log('Successfully sent message:', response);
        return NextResponse.json({ success: true, messageId: response });

    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Error sending message', details: error }, { status: 500 });
    }
}
