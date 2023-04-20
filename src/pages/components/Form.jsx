import React, { useRef } from "react";
import { addDoc } from "@firebase/firestore";

export default function Form({ db }) {
  const messageRef = useRef();
  const titleRef = useRef();
  const userRef = useRef();
  // Handlers
  const handleSave = async (e) => {
    e.preventDefault();
    if (messageRef.current.value === "" || titleRef.current.value === "")
      return;
    let data = {
      title: titleRef.current.value,
      user: userRef.current.value,
      content: messageRef.current.value,
      timestamp: new Date(),
    };
    try {
      addDoc(db, data);
    } catch (error) {
      console.log(error);
    }
    clearInputs(e);
  };

  function clearInputs(e) {
    e.target.querySelector("input.title").value = "";
    e.target.querySelector("textarea.body").value = "";
  }

  return (
    <form className="create" onSubmit={handleSave}>
      <input
        className="title"
        type="text"
        ref={titleRef}
        placeholder="title *"
        maxLength="50"
        required
      />
      <input
        className="user"
        type="text"
        ref={userRef}
        placeholder="name (optional)"
        maxLength="10"
      />
      <textarea
        className="body"
        type="text"
        ref={messageRef}
        placeholder="message *"
        maxLength="300"
        required
      />
      <button className="submit" type="submit">
        send
      </button>
    </form>
  );
}
