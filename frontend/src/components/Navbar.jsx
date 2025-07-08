import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg w-full fixed top-0 left-0 z-50 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-3xl font-extrabold text-blue-700 tracking-wide">
            HealthLingo
          </div>

          <div className="flex space-x-8 items-center">
            <a href="#" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">Home</a>
            <a href="#" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">About Us</a>
            <a href="#" className="text-blue-700 px-3 py-2 rounded-md text-lg font-semibold">Resources</a>
          </div>

          <div className="flex space-x-4 items-center">
            {/* 👇 Buttons without Link or routing */}
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg border border-blue-700">
              Register
            </button>
            <button className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;