
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, Messaging, isSupported } from "firebase/messaging";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCb6ZP46kzcI00v6i94-EeYYmklhLxhEgI",
  authDomain: "glad-ai.firebaseapp.com",
  projectId: "glad-ai",
  storageBucket: "glad-ai.firebasestorage.app",
  messagingSenderId: "590214569404",
  appId: "1:590214569404:web:a18679ff2a4b6bc3e69fb9",
  measurementId: "G-E4369B98YQ"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Storage
const storage = getStorage(app);

let messaging: Messaging | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

// Analytics (optional, only client-side)
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export { app, messaging, storage };
