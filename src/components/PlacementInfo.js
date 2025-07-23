import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlacementInfo.css";

const PlacementInfo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    placed: "",
    company: "",
    skills: "",
    package: "",
  });

  useEffect(() => {
    const student = localStorage.getItem("student");
    if (!student) {
      navigate("/register");
      return;
    }

    const parsed = JSON.parse(student);
    if (parsed.year !== "4th") {
      navigate("/upload");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "placed" && value === "no") {
      navigate("/upload");
    }
  };

  const handleSubmit = async () => {
    const student = JSON.parse(localStorage.getItem("student"));

    try {
      const res = await axios.post("http://localhost:5000/api/placement", {
        rollno: student.rollno,
        placed: form.placed,
        company: form.company,
        skills: form.skills,
        package: form.package,
      });
      alert("Placement info submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit placement info");
    }
  };

  return (
    <div className="placement-container">
      <h1 className="placement-heading">🎓 Placement Information</h1>
      <p className="placement-subtext">
        Only accessible to <strong>4th year students</strong>.
      </p>

      <div className="form-group">
        <label className="form-label">Are you placed?</label>
        <select
          name="placed"
          value={form.placed}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">--Select--</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {form.placed === "yes" && (
        <div className="placement-form">
          <input
            type="text"
            placeholder="Company Name"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Package"
            name="package"
            value={form.package}
            onChange={handleChange}
            className="form-input"
          />
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PlacementInfo;
