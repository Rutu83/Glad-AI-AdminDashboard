
'use client'

import { useEffect, useState } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../utils/firebase';

const useFcmToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission>('default');

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    if (messaging) {
                        const permission = await Notification.requestPermission();
                        setNotificationPermissionStatus(permission);

                        if (permission === 'granted') {
                            const currentToken = await getToken(messaging, {
                                // vapidKey: 'YOUR_VAPID_KEY' // Optional if using default, but if you have generated one in console, put it here.
                            });
                            if (currentToken) {
                                setToken(currentToken);
                                console.log('FCM Token:', currentToken);
                            } else {
                                console.log('No registration token available. Request permission to generate one.');
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('An error occurred while retrieving token:', error);
            }
        };

        retrieveToken();
    }, []);

    return { token, notificationPermissionStatus };
};

export default useFcmToken;
