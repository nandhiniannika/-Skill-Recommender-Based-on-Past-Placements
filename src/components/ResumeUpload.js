import React, { useState } from 'react';
import axios from 'axios';
import './ResumeUpload.css';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [matchedPlacements, setMatchedPlacements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('📎 Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/skills/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMatchedPlacements(res.data.matchedPlacements || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('❌ Error uploading the file or connecting to the server.');
      setMatchedPlacements([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="resume-upload-container">
      <h1><b>Skill Recognition System</b></h1>
      <h2>📄 Upload Your Resume</h2>

      <form className="resume-form" onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Uploading...' : 'Upload'}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {matchedPlacements.length > 0 && (
        <div className="result-box">
          <h3>🎯 Matched Placements</h3>
          <ul>
            {matchedPlacements.map((placement, index) => (
              <li key={index} className="placement-card">
                <strong>{placement.name}</strong> — {placement.company} ({placement.package})<br />
                <span className="skills">Skills: {placement.skills.join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {matchedPlacements.length === 0 && !error && !loading && (
        <p className="no-match-msg">😕 No matching placements found.</p>
      )}
    </div>
  );
};

export default ResumeUpload;
