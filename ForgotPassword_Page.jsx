import React, { useState } from 'react';
import './Login_Page.css';

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Password reset link sent to ${email}`);
      onBack(); // Go back to login
    } else {
      alert('Please enter your email address');
    }
  };

  return (
    <div className="login-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
        <button type="button" onClick={onBack}>Back to Login</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
