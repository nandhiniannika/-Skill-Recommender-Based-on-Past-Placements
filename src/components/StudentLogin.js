import React, { useState } from 'react';
import axios from 'axios';
import UploadResume from './ResumeUpload'; // Import the component to show after login
import './StudentLogin.css'; // Optional, for styling

const StudentLogin = () => {
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/student/login', {
        rollno,
        password,
      });

      localStorage.setItem('student', JSON.stringify(res.data.student));
      setStudentData(res.data.student);
      setIsLoggedIn(true); // Show UploadResume after login
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong.');
      }
    }
  };

  if (isLoggedIn) {
    return <UploadResume student={studentData} />;
  }

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default StudentLogin;
