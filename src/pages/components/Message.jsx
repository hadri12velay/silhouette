import React from "react";
import DOMPurify from "dompurify";

export default function Message({ messages }) {
  // functions
  function interpretText(text) {
    let newText = DOMPurify.sanitize(text);
    newText = newText.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="special">$1</span>'
    );
    console.log(text);
    return newText;
  }

  return (
    <div className="messages">
      {messages.map((message) => (
        <div className="message" key={message.id}>
          <h3 className="title">{message.title}</h3>
          <h3 className="user">{message.user ? "- " + message.user : ""}</h3>
          <p
            className="body"
            dangerouslySetInnerHTML={{ __html: interpretText(message.content) }}
          />
        </div>
      ))}
    </div>
  );
}
