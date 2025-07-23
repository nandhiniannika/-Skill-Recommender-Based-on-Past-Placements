// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentRegister from "./components/StudentRegister";
import StudentLogin from "./components/StudentLogin";
import ResumeUpload from "./components/ResumeUpload";
import PlacementInfo from "./components/PlacementInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/register" element={<StudentRegister />} /> */}
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/placement" element={<PlacementInfo />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="*" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
