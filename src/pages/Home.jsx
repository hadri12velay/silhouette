import React, { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase";
import { addDoc, getDocs, collection } from "@firebase/firestore";

export default function Home() {
  // Constants
  const messageRef = useRef();
  const ref = collection(firestore, "messages");

  // UseStates
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState([false]);

  // Handlers
  const handleSave = async (e) => {
    if (messageRef.current.value === "") return;
    e.preventDefault();
    console.log(messageRef.current.value);
    let data = {
      content: messageRef.current.value,
    };
    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
    getMessages(false);
  };

  async function getMessages(changeLoading = true) {
    if (changeLoading) setLoading(true);
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMessages(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Enter Message: </label>
        <input type="text" ref={messageRef} placeholder="Your message" />
        <button type="submit">Save</button>
      </form>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
