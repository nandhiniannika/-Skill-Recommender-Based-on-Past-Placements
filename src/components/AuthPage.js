import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css'; // or your CSS file for styling

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button onClick={() => navigate('/login')} className="auth-btn">Login</button>
        <button onClick={() => navigate('/register')} className="auth-btn">Register</button>
      </div>
    </div>
  );
};

export default AuthPage;
