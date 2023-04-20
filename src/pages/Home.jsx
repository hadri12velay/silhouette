import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";

// Components
import Message from "./components/Message";
import Form from "./components/Form";

export default function Home() {
  // Constants
  const ref = collection(firestore, "messages");

  // UseStates
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState([false]);

  function getMessages() {
    setLoading(true);
    try {
      const q = query(ref, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    console.log("loading...");
  }

  return (
    <div className="main">
      <Form ref={ref} />
      <Message messages={messages} />
    </div>
  );
}
