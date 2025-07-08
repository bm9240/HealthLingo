import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">

      {/* Left Panel - Gradient Background & Curve */}
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

        <form className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Full Name"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* 📅 Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* ⚧ Gender Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="gender" value="male" className="accent-blue-600" />
                Male
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="gender" value="female" className="accent-blue-600" />
                Female
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="gender" value="other" className="accent-blue-600" />
                Other
              </label>
            </div>
          </div>

          <button className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md">
            Register
          </button>
        </form>
      </div>

    </div>
  );
};

export default Register;
