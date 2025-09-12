// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js");

// Initialize Firebase (same config as index.html)
firebase.initializeApp({
        apiKey: "AIzaSyCIrp6XdejjP2SX6C2YNWl54HD99hgDZpY",
        authDomain: "halleluiah-efd3d.firebaseapp.com",
        projectId: "halleluiah-efd3d",
        storageBucket: "halleluiah-efd3d.firebasestorage.app",
        messagingSenderId: "1000881270210",
        appId: "1:1000881270210:web:687252e435b9ef86ddba5b",
        measurementId: "G-5K2160S951"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});
