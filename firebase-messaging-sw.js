importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCIrp6XdejjP2SX6C2YNWl54HD99hgDZpY",
  authDomain: "halleluiah-efd3d.firebaseapp.com",
  projectId: "halleluiah-efd3d",
  storageBucket: "halleluiah-efd3d.appspot.com",
  messagingSenderId: "1000881270210",
  appId: "1:1000881270210:web:687252e435b9ef86ddba5b",
  measurementId: "G-5K2160S951"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});
