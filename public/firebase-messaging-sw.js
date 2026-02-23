importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCb6ZP46kzcI00v6i94-EeYYmklhLxhEgI",
    authDomain: "glad-ai.firebaseapp.com",
    projectId: "glad-ai",
    storageBucket: "glad-ai.firebasestorage.app",
    messagingSenderId: "590214569404",
    appId: "1:590214569404:web:a18679ff2a4b6bc3e69fb9",
    measurementId: "G-E4369B98YQ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/icon-192x192.png' // Modify path as needed
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
