import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome to <span className="highlight">MindSage</span></h2>
      <p>Your AI-powered mental health assistant</p>
      <p>Analyze your mood, get personalized support, and feel heard — all powered by AI.</p>
      <button onClick={() => navigate('/chat')}>
        Access Health Portal
      </button>
    </div>
  );
};

export default HomePage;
