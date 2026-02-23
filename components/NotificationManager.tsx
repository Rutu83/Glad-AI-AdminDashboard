'use client'

import { useEffect, useState } from 'react';
import useFcmToken from '../hooks/useFcmToken';
import { getMessaging, onMessage } from 'firebase/messaging';
import { messaging } from '../utils/firebase';

export default function NotificationManager() {
    const { token, notificationPermissionStatus } = useFcmToken();
    const [message, setMessage] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && messaging) {
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground message received:', payload);
                setMessage(payload);
                // Custom toast or UI update here
                // alert(`New Notification: ${payload.notification?.title}`);
            });

            return () => {
                unsubscribe(); // Unsubscribe when component unmounts
            };
        }
    }, []);

    // Hidden component, or used for debugging
    return (
        <div className="hidden">
            {/* 
      Debug info (remove in production):
      <p>Token: {token}</p>
      <p>Permission: {notificationPermissionStatus}</p>
      */}
        </div>
    );
}
