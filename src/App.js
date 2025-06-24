import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import StudentLogin from './components/StudentLogin';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
    
      {!isLoggedIn ? (
        <StudentLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ResumeUpload />
      )}
    </div>
  );
};

export default App;
