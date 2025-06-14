import React, { useState } from 'react';
import Login from './Login_Page';
import HomePage from './Home_Page';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username, password) => {
    if ((username === 'Raju' || username === 'Soumya' || username === 'Shyam') && password === '12345') {
      setCurrentUser(username);
      return true;
    }
    return false;
  };

  const handleLogout = () => setCurrentUser(null);

  const handleSignUpClick = () => {
    alert('Sign Up is disabled. Please use username: Raju or Soumya or Shyam and password: 12345');
  };

  return (
    <div>
      {currentUser ? (
        <HomePage username={currentUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} onSignUpClick={handleSignUpClick} />
      )}
    </div>
  );
  
}

export default App;
