import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';



import {
  FaCode,
  FaMobileAlt,
  FaPencilRuler,
  FaBug,
  FaTools,
  FaFacebook,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';

// Speech function (click-based only)
const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

function App() {
  const [view, setView] = useState('main');

  // Web development languages (Python has description)
  const webLanguages = [
    {
      name: 'Python',
      description:
        'Python is a high-level, interpreted, general-purpose programming language. It was created by Guido van Rossum and first released in 1991.'
    },
    { name: 'Java' },
    { name: 'JavaScript' },
    { name: 'R' },
    { name: 'C#' },
    { name: 'C++' },
    { name: 'C+' }
  ];

  // Software testing types
  const testingSkills = ['Manual Testing', 'Automation Testing', 'Playwright', 'API Testing'];

  const handleWebDevClick = () => {
    speakText('Web Development');
    setView('webTech');
  };

  const handleTestingClick = () => {
    speakText('Software Testing');
    setView('testTech');
  };

  const handleBackClick = () => {
    speakText('Back to Services');
    setView('main');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="AR IT PVT LTD" />
        </div>
        <h3>AR Technology</h3>
        <h1>Welcome to AR Technology</h1>
        <p className="intro-text">We are a leading IT solutions provider.</p>
      </nav>

      <section id="services" className="services-section">
        <h2>
          {view === 'main' && 'Our Services'}
          {view === 'webTech' && 'Web Development Technologies'}
          {view === 'testTech' && 'Software Testing Types'}
        </h2>

        {/* Main Services */}
        {view === 'main' && (
          <ul>
            <li onClick={handleWebDevClick}>
              <FaCode /> Web Development
            </li>
            <li onClick={() => speakText('Mobile App Development')}>
              <FaMobileAlt /> Mobile App Development
            </li>
            <li onClick={() => speakText('UI UX Design')}>
              <FaPencilRuler /> UI/UX Design
            </li>
            <li onClick={handleTestingClick}>
              <FaBug /> Software Testing
            </li>
            <li onClick={() => speakText('IT Support and Maintenance')}>
              <FaTools /> IT Support and Maintenance
            </li>
          </ul>
        )}

        {/* Web Technologies View */}
        {view === 'webTech' && (
          <div className="language-list">
            <ul>
              {webLanguages.map((lang) => (
                <li
                  key={lang.name}
                  onClick={() => speakText(lang.description || lang.name)}
                  style={{ cursor: 'pointer' }}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
            <button onClick={handleBackClick} style={{ marginTop: '20px' }}>
              ⬅ Back to Services
            </button>
          </div>
        )}

        {/* Software Testing View */}
        {view === 'testTech' && (
          <div className="language-list">
            <ul>
              {testingSkills.map((skill) => (
                <li
                  key={skill}
                  onClick={() => speakText(skill)}
                  style={{ cursor: 'pointer' }}
                >
                  {skill}
                </li>
              ))}
            </ul>
            <button onClick={handleBackClick} style={{ marginTop: '20px' }}>
              ⬅ Back to Services
            </button>
          </div>
        )}
      </section>

      <footer id="contact" className="footer">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} <strong>AR IT PVT LTD</strong>. All rights reserved.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:info@aritpvtltd.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
