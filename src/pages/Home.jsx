import React, { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase";
import {
  onSnapshot,
  addDoc,
  collection,
  query,
  orderBy,
} from "@firebase/firestore";

export default function Home() {
  // Constants
  const messageRef = useRef();
  const titleRef = useRef();
  const ref = collection(firestore, "messages");

  // UseStates
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState([false]);

  // Handlers
  const handleSave = async (e) => {
    e.preventDefault();
    if (messageRef.current.value === "" || titleRef.current.value === "")
      return;
    let data = {
      title: titleRef.current.value,
      content: messageRef.current.value,
      timestamp: new Date(),
    };
    try {
      addDoc(ref, data);
    } catch (error) {
      console.log(error);
    }
    clearInputs(e);
  };

  function clearInputs(e) {
    return;
  }

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
      <form className="create" onSubmit={handleSave}>
        <input
          className="title"
          type="text"
          ref={titleRef}
          placeholder="title"
          maxlength="50"
        />
        <textarea
          className="body"
          type="text"
          ref={messageRef}
          placeholder="message"
          maxlength="300"
        />
        <button type="submit">save</button>
      </form>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <h3 className="title">{message.title}</h3>
            <p className="body">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
