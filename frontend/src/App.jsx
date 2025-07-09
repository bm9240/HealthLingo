import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import UploadReport from "./components/UploadReport"; // ✅ new
import UploadPrescription from "./components/UploadPrescription"; // ✅ new
import Resources from "./components/Resources"; // ✅ new
const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} /> {/* ✅ new route */}
        <Route path="/upload-report" element={<UploadReport />} />           {/* ✅ new route */}
        <Route path="/upload-prescription" element={<UploadPrescription />} /> {/* ✅ new route */}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
