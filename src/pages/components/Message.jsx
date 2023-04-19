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
    newText = newText.replace(/@@(.*?)@@/g, '<span class="special2">$1</span>');
    return newText;
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
