import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBox from './components/ChatBox';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <h1>🧠 <span className="brand-name">MindSage</span></h1>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatBox />} />
          </Routes>
        </main>

        <footer className="app-footer">
          © 2025 MindSage | All rights reserved
        </footer>
      </Router>
    </div>
  );
}

export default App;
