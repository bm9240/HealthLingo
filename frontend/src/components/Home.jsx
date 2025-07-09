import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex pt-16 bg-gradient-to-br from-blue-200 via-white to-blue-400">
      {/* Left Side - Upload Report */}
      <div className="w-1/2 flex flex-col justify-center items-center text-blue-900 relative overflow-hidden bg-gradient-to-br from-red-200 via-purple-200 to-blue-300">
        <div className="absolute inset-0 bg-gradient-to-br from-red-300 via-purple-200 to-blue-200 opacity-80"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-pink-300 rounded-full opacity-50 blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="z-10 text-center px-8">
          <p className="text-lg font-light mb-4 italic text-red-700">Need help understanding?</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight drop-shadow">
            UPLOAD YOUR<br /> MEDICAL REPORT
          </h1>
          <p className="text-lg mb-8 max-w-md mx-auto text-blue-900/80">
            From complex medical terminology to simple explanations, 
            we simplify your reports for better understanding.
          </p>
          <button
            className="bg-gradient-to-r from-red-500 to-purple-400 text-white px-6 py-3 rounded-md border-2 border-red-400 font-semibold hover:from-red-600 hover:to-purple-500 hover:border-red-600 transition duration-300 shadow"
            onClick={() => navigate("/upload-report")}
          >
            UPLOAD NOW
          </button>
        </div>
      </div>

      {/* Right Side - Upload Prescription */}
      <div className="w-1/2 flex flex-col justify-center items-center text-blue-900 relative overflow-hidden bg-gradient-to-br from-green-200 via-blue-100 to-blue-300">
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 via-blue-100 to-blue-200 opacity-80"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-300 rounded-full opacity-50 blur-2xl translate-x-1/2 translate-y-1/2"></div>
        <div className="z-10 text-center px-8">
          <p className="text-lg font-light mb-4 italic text-blue-700">Confused about medications?</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight drop-shadow">
            UPLOAD YOUR<br /> PRESCRIPTION
          </h1>
          <p className="text-lg mb-8 max-w-md mx-auto text-blue-900/80">
            Get clear explanations about your medications, 
            dosages, and instructions in easy-to-understand language.
          </p>
          <button
            className="bg-gradient-to-r from-blue-600 to-green-400 text-white px-6 py-3 rounded-md border-2 border-blue-400 font-semibold hover:from-blue-700 hover:to-green-500 hover:border-blue-700 transition duration-300 shadow"
            onClick={() => navigate("/upload-prescription")}
          >
            UPLOAD NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;