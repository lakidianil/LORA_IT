import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import { SafeAreaView, StyleSheet } from 'react-native';
  

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isLoggedIn ? <App /> : <Navigate to="/login" />} />
        <Route path="/user/:id" element={isLoggedIn ? <User /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
