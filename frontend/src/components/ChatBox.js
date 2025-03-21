import React, { useState } from 'react';
import Sentiment from 'sentiment';
import './ChatBox.css';

const sentiment = new Sentiment();

const moodQuestions = {
  '😊 Happy': [
    "That's great! What made you feel happy today?",
    "How do you usually maintain your positive energy?",
    "Do you feel like your happiness is consistent lately?",
    "Who or what contributes most to your joy?",
    "Would you like to explore ways to stay in this state?"
  ],
  '🙂 Slightly Positive': [
    "What's something you're looking forward to?",
    "Is there anything you’d like to improve in your day?",
    "What helps lift your mood when you're feeling low?",
    "Would you like to talk about anything on your mind?",
    "Do you feel supported by people around you?"
  ],
  '😐 Neutral': [
    "How has your week been so far?",
    "Have there been any changes in your daily routine?",
    "Would you say you're feeling emotionally balanced?",
    "Is there something you wish was different right now?",
    "Do you often find yourself feeling like this?"
  ],
  '😞 Sad': [
    "I'm here for you. What’s been bothering you lately?",
    "Would you like to talk about what made you feel this way?",
    "Have you been sleeping or eating well recently?",
    "Do you feel understood by people around you?",
    "What do you think might help you feel a bit better?"
  ],
  '😔 Depressed': [
    "I'm really sorry you're feeling this way. Do you want to talk?",
    "Have these feelings lasted more than a few days?",
    "Is there someone you can reach out to for support?",
    "Would you like help finding a professional to talk to?",
    "What’s one small thing that could bring you comfort today?"
  ]
};

const classifyEmotion = (text) => {
  const { score } = sentiment.analyze(text);
  if (score > 3) return '😊 Happy';
  if (score > 0) return '🙂 Slightly Positive';
  if (score === 0) return '😐 Neutral';
  if (score < -3) return '😔 Depressed';
  return '😞 Sad';
};

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm MindSage. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [emotion, setEmotion] = useState('Analyzing...');
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);

  const askNextQuestion = (currentEmotion) => {
    const available = moodQuestions[currentEmotion].filter(q => !askedQuestions.includes(q));
    if (available.length > 0 && questionCount < 5) {
      const next = available[Math.floor(Math.random() * available.length)];
      setAskedQuestions(prev => [...prev, next]);
      setMessages(prev => [...prev, { type: 'bot', text: next }]);
      setQuestionCount(prev => prev + 1);
    } else if (questionCount >= 5) {
      setMessages(prev => [
      ...prev,
      { type: 'bot', text: "✅ Your mental health check is complete. [View Assessment Report](#/summary)" }
]);

    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    const detectedEmotion = classifyEmotion(input);
    setEmotion(detectedEmotion);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: 'Thanks for sharing. Let’s continue...' }]);
      askNextQuestion(detectedEmotion);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      <div className="sidebar">
        <h3>🧠 Emotion Tracker</h3>
        <p><strong>Mental State:</strong> <span className="emotion">{emotion}</span></p>
        <p><strong>Questions Asked:</strong> {questionCount}/5</p>
      </div>
    </div>
  );
};

export default ChatBox;
