import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    medical_history: "",
    allergies: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-white font-sans overflow-auto pt-8 md:pt-0">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-bl from-blue-300 via-white to-blue-500 text-blue-900 flex flex-col justify-center items-center px-6 md:px-10 py-12 md:py-0 custom-rounded-panel">
        <h2 className="text-5xl font-extrabold mb-3 tracking-wide drop-shadow-lg">
          Register To Decode Your Health
        </h2>
        <p className="mb-8 text-lg font-light text-blue-800/90">
          Already have an account?
        </p>
        <Link to="/login">
          <button className="border border-blue-800 text-blue-800 px-8 py-3 text-lg rounded-full font-medium hover:bg-blue-800 hover:text-white transition duration-300 ease-in-out shadow-md">
            Login
          </button>
        </Link>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-12 md:py-0">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Register</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* 📅 Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* ⚧ Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <div className="flex gap-6">
              {["male", "female", "other"].map((g) => (
                <label key={g} className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* 📝 Medical History */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Medical History</label>
            <textarea
              name="medical_history"
              placeholder="Enter medical history..."
              rows="3"
              value={formData.medical_history}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            />
          </div>

          {/* 🌾 Allergies */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Allergies</label>
            <textarea
              name="allergies"
              placeholder="Mention any allergies..."
              rows="2"
              value={formData.allergies}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;