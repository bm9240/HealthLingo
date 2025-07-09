import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user?.email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg w-full fixed top-0 left-0 z-50 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer" onClick={() => navigate("/")}>
            HealthLingo
          </div>

          {/* Links */}
          <div className="flex space-x-8 items-center">
            <Link to="/" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">Home</Link>
            <Link to="/about" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">About Us</Link>
            <a href="#" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">Resources</a>
            {isLoggedIn && (
              <Link to="/dashboard" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">Dashboard</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-4 items-center">
            {!isLoggedIn ? (
              <>
                <Link to="/register">
                  <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg border border-blue-700">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
