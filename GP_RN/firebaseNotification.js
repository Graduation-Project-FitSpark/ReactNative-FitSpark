// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   getDocs,
//   startAfter,
//   limit,
// } from "firebase/firestore";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// import { useState, useEffect } from "react";

// const firebaseConfig = {
//   apiKey: "AIzaSyATvu78fJKbh9uSYiCfJcp3EWM9gABTP2o",
//   authDomain: "fitspark-78775.firebaseapp.com",
//   projectId: "fitspark-78775",
//   storageBucket: "fitspark-78775.filestorage.app",
//   messagingSenderId: "1091950880719",
//   appId: "1:1091950880719:web:f177dc7408e5e5b14b94ba",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Helper to register for push notifications
// const registerForPushNotificationsAsync = async () => {
//   if (!Constants.isDevice) {
//     console.warn("Push notifications only work on physical devices.");
//     return null;
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     console.warn("Failed to get push notification permissions!");
//     return null;
//   }

//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log("Expo Push Token:", token);
//   return token;
// };

// // Send notification to Firestore and also push to device
// const sendNotification = async (title, body, userId) => {
//   const notification = {
//     title,
//     body,
//     userId,
//     timestamp: new Date(),
//     isRead: false,
//   };

//   try {
//     // Add to Firestore
//     await addDoc(collection(db, "notifications"), notification);
//     console.log("Notification sent to Firestore successfully");

//     // Get the Expo push token
//     const expoPushToken = await registerForPushNotificationsAsync();
//     if (!expoPushToken) {
//       throw new Error("Failed to retrieve Expo push token");
//     }

//     console.log("Expo Push Token retrieved:", expoPushToken);

//     // Send push notification via Expo push notification service
//     await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         to: expoPushToken,
//         sound: "default",
//         title,
//         body,
//       }),
//     });

//     console.log("Notification sent to device successfully");
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };

// // Fetch and show notifications
// const useNotifications = (userId, limitCount = 20) => {
//   const [notifications, setNotifications] = useState([]);
//   const [lastDoc, setLastDoc] = useState(null);

//   useEffect(() => {
//     const fetchInitialNotifications = async () => {
//       const notificationsQuery = query(
//         collection(db, "notifications"),
//         where("userId", "==", userId),
//         orderBy("timestamp", "desc"),
//         limit(limitCount)
//       );

//       const snapshot = await getDocs(notificationsQuery);
//       const initialNotifications = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setNotifications(initialNotifications);
//       setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
//     };

//     fetchInitialNotifications();

//     const notificationsQuery = query(
//       collection(db, "notifications"),
//       where("userId", "==", userId),
//       orderBy("timestamp", "desc")
//     );

//     const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const newNotif = { id: change.doc.id, ...change.doc.data() };

//           // Directly update state without showing local notifications
//           setNotifications((prev) => [newNotif, ...prev]);
//         }
//       });
//     });

//     return () => unsubscribe(); // Unsubscribe when component unmounts
//   }, [userId, limitCount]);

//   const loadMoreNotifications = async () => {
//     if (!lastDoc) return;

//     const nextQuery = query(
//       collection(db, "notifications"),
//       where("userId", "==", userId),
//       orderBy("timestamp", "desc"),
//       startAfter(lastDoc),
//       limit(limitCount)
//     );

//     const nextSnapshot = await getDocs(nextQuery);
//     const nextNotifications = nextSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     setNotifications((prev) => [...prev, ...nextNotifications]);
//     setLastDoc(nextSnapshot.docs[nextSnapshot.docs.length - 1]);
//   };

//   return { notifications, loadMoreNotifications };
// };

// export { sendNotification, useNotifications };
