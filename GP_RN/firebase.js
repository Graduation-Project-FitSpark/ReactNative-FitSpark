import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATvu78fJKbh9uSYiCfJcp3EWM9gABTP2o",
  authDomain: "fitspark-78775.firebaseapp.com",
  projectId: "fitspark-78775",
  storageBucket: "fitspark-78775.filestorage.app",
  messagingSenderId: "1091950880719",
  appId: "1:1091950880719:web:f177dc7408e5e5b14b94ba",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sendMessage = async (text, senderId, receiverId) => {
  const message = {
    text,
    senderId,
    receiverId,
    timestamp: new Date(),
  };

  try {
    await addDoc(collection(db, "messages"), message);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const useMessages = (userId, otherUserId, limitCount = 20) => {
  const [messages, setMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const messagesQuery = query(
        collection(db, "messages"),
        where("senderId", "in", [userId, otherUserId]),
        where("receiverId", "in", [userId, otherUserId]),
        orderBy("timestamp", "asc"),
        limit(limitCount)
      );

      const snapshot = await getDocs(messagesQuery);
      const initialMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(initialMessages);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    };

    fetchInitialMessages();

    const messagesQuery = query(
      collection(db, "messages"),
      where("senderId", "in", [userId, otherUserId]),
      where("receiverId", "in", [userId, otherUserId]),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [userId, otherUserId, limitCount]);

  const loadMoreMessages = async () => {
    if (!lastDoc) return;

    const nextQuery = query(
      collection(db, "messages"),
      where("senderId", "in", [userId, otherUserId]),
      where("receiverId", "in", [userId, otherUserId]),
      orderBy("timestamp", "asc"),
      startAfter(lastDoc),
      limit(limitCount)
    );

    const nextSnapshot = await getDocs(nextQuery);
    const nextMessages = nextSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMessages((prev) => [...prev, ...nextMessages]);
    setLastDoc(nextSnapshot.docs[nextSnapshot.docs.length - 1]);
  };

  return { messages, loadMoreMessages };
};

export { sendMessage, useMessages };
