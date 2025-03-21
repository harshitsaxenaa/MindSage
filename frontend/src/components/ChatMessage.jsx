import React from "react";

const ChatMessage = ({ message, sender }) => {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`p-3 rounded-2xl max-w-md ${isUser ? "bg-blue-600" : "bg-gray-700"}`}>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
