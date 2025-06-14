import React, { useEffect, useState } from 'react';
import './Home_Page.css';
import logo from './lora-logo.png';

function HomePage({ username, onLogout }) {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const todayKey = `${username}_${new Date().toLocaleDateString()}`;

  // Load clock in/out times from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(todayKey));
    if (saved) {
      if (saved.clockIn) setClockInTime(new Date(saved.clockIn));
      if (saved.clockOut) setClockOutTime(new Date(saved.clockOut));
    }
  }, [todayKey]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Speak greeting once per session
  useEffect(() => {
    const spokenFlag = sessionStorage.getItem('hasSpokenGreeting');
    if (!spokenFlag) {
      const hour = currentTime.getHours();
      let greeting = 'Hello';

      if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
      } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
      } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening';
      } else {
        greeting = 'Good Night';
      }

      const message = `Welcome ${username}, ${greeting}! Have a nice day.`;
      speak(message);
      sessionStorage.setItem('hasSpokenGreeting', 'true'); // Prevent repeat
    }
  }, [username, currentTime]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    localStorage.setItem(todayKey, JSON.stringify({ clockIn: now }));
    speak(`Clocked in at ${now.toLocaleTimeString()}`);
  };

  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    const existing = JSON.parse(localStorage.getItem(todayKey)) || {};
    localStorage.setItem(todayKey, JSON.stringify({ ...existing, clockOut: now }));
    speak(`Clocked out at ${now.toLocaleTimeString()}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('hasSpokenGreeting'); // Reset greeting flag on logout
    setClockInTime(null);
    setClockOutTime(null);
    onLogout();
  };

  const getGreetingText = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return (
    <div className="home-container">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="home-logo" />
        <h2 className="company-header">LORA IT INNOVATIONS PVT LTD</h2>
      </div>

      <h1 className="greeting">Hi {username}, {getGreetingText()} 👋</h1>
      <h2 className="clock">Current Time: {currentTime.toLocaleTimeString()}</h2>

      <div className="button-group">
        <button
          className="clock-btn"
          onClick={handleClockIn}
          disabled={!!clockInTime}
        >
          🕒 Clock In
        </button>
        <button
          className="clock-btn"
          onClick={handleClockOut}
          disabled={!clockInTime || !!clockOutTime}
        >
          🕔 Clock Out
        </button>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="time-log">
        {clockInTime && <p>🟢 Clock In Time: {clockInTime.toLocaleTimeString()}</p>}
        {clockOutTime && <p>🔴 Clock Out Time: {clockOutTime.toLocaleTimeString()}</p>}
      </div>
    </div>
  );
}

export default HomePage;
