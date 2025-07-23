// StudentRegister.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentRegister.css";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    password: "",
    branch: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("student", JSON.stringify(formData));

    if (formData.year === "4th") {
      navigate("/placement");
    } else {
      navigate("/upload");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rollno"
          placeholder="Roll No"
          value={formData.rollno}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
        <select name="year" value={formData.year} onChange={handleChange} required>
          <option value="">Select Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
        </select>
        <button type="submit">Register</button>
      </form>

      <p className="login-redirect">
        Already registered?{" "}
        <span onClick={handleLoginRedirect} className="login-link">
          Login
        </span>
      </p>
    </div>
  );
};

export default StudentRegister;
