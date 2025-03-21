import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to MindSage</h1>
      <p className="landing-desc">
        An intelligent mental health assistant powered by Emotion AI 🤖
      </p>
      <button className="enter-btn" onClick={() => navigate('/chat')}>Access Health Portal</button>
    </div>
  );
};

export default LandingPage;
