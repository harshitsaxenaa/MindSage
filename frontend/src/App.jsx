import React, { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import Loader from "./components/Loader";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: `Emotion Detected: ${data.emotion}`,
        },
        {
          sender: "bot",
          text: data.next_question,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: "bot", text: "❌ Error: Try again later." }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 MindSage</h1>

      <div className="bg-white bg-opacity-10 rounded-xl p-4 h-[70vh] overflow-y-auto shadow-lg">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg.text} sender={msg.sender} />
        ))}
        {loading && <Loader />}
      </div>

      <div className="mt-4 flex">
        <input
          className="flex-grow p-3 rounded-l-xl bg-white text-black focus:outline-none"
          placeholder="Type your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-r-xl hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
