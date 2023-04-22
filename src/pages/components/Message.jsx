import React from "react";
import DOMPurify from "dompurify";

export default function Message({ messages, loading }) {
  // functions
  function interpretText(text) {
    let newText = DOMPurify.sanitize(text);
    newText = newText.replace(/\*\*(.*?)\*\*/g, '<span class="red">$1</span>');
    newText = newText.replace(/@@(.*?)@@/g, '<span class="blue">$1</span>');
    newText = newText.replace(/__(.*?)__/g, '<span class="rainbow">$1</span>');
    return newText;
  }

  if (loading) {
    return (
      <div className="messages loading">
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    <div className="messages">
      {messages.map((message) => (
        <div className="message" key={message.id}>
          <div className="title">
            <h3>{message.title}</h3>
          </div>
          <div className="user">
            <h3>{message.user ? "- " + message.user : ""}</h3>
          </div>
          <div className="body">
            <p
              dangerouslySetInnerHTML={{
                __html: interpretText(message.content),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
