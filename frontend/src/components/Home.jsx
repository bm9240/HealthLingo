import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex pt-16">
      {/* Left Side - Upload Report */}
      <div className="w-1/2 bg-red-500 flex flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600 opacity-20"></div>
        <div className="z-10 text-center px-8">
          <p className="text-lg font-light mb-4 italic">Need help understanding?</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            UPLOAD YOUR<br /> MEDICAL REPORT
          </h1>
          <p className="text-lg mb-8 max-w-md mx-auto">
            From complex medical terminology to simple explanations, 
            we simplify your reports for better understanding.
          </p>
          <button
            className="bg-white text-red-600 px-6 py-3 rounded-md border-2 border-red-600 font-semibold hover:bg-red-600 hover:text-white transition duration-300"
            onClick={() => navigate("/upload-report")}
          >
            UPLOAD NOW
          </button>
        </div>
      </div>

      {/* Right Side - Upload Prescription */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-700 opacity-20"></div>
        <div className="z-10 text-center px-8">
          <p className="text-lg font-light mb-4 italic">Confused about medications?</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            UPLOAD YOUR<br /> PRESCRIPTION
          </h1>
          <p className="text-lg mb-8 max-w-md mx-auto">
            Get clear explanations about your medications, 
            dosages, and instructions in easy-to-understand language.
          </p>
          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-md border-2 border-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
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
