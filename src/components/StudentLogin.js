import React, { useState } from 'react';
import axios from 'axios';
import './StudentLogin.css';

const StudentLogin = ({ onLoginSuccess }) => {
  const [rollno, setRollno] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!rollno.trim()) {
      setError('Please enter your roll number.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/student/login', { rollno });
      localStorage.setItem('token', res.data.token);
      setError('');
      onLoginSuccess(); // Callback to parent to show ResumeUpload
    } catch (err) {
      setError('Invalid roll number or server error.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Student Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            placeholder="Enter Roll Number"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="login-error">⚠️ {error}</p>}
      </div>
    </div>
  );
};

export default StudentLogin;
