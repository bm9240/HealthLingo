import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      // Redirect to login if no user found
      navigate("/login");
    }

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (!userInfo) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 font-sans pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-2xl rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
                  {getGreeting()}, {userInfo.name}! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Welcome to your HealthLingo Dashboard
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* User Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Personal Information Card */}
          <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                👤
              </div>
              <h2 className="text-xl font-bold text-blue-700 ml-3">Personal Info</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800 font-semibold">{userInfo.name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-800 font-semibold text-sm">{userInfo.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Gender:</span>
                <span className="text-gray-800 font-semibold capitalize">{userInfo.gender || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Date of Birth:</span>
                <span className="text-gray-800 font-semibold text-sm">{formatDate(userInfo.dob)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Age:</span>
                <span className="text-gray-800 font-semibold">{calculateAge(userInfo.dob)} years</span>
              </div>
            </div>
          </div>

          {/* Medical History Card */}
          <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                🏥
              </div>
              <h2 className="text-xl font-bold text-blue-700 ml-3">Medical History</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 text-sm leading-relaxed">
                {userInfo.medical_history || "No medical history recorded."}
              </p>
            </div>
          </div>

          {/* Allergies Card */}
          <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xl">
                ⚠️
              </div>
              <h2 className="text-xl font-bold text-blue-700 ml-3">Allergies</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 text-sm leading-relaxed">
                {userInfo.allergies || "No known allergies."}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
            <span className="mr-3">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/upload-report"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-semibold mb-2">Upload Report</h3>
              <p className="text-sm opacity-90">Analyze medical reports with AI</p>
            </Link>

            <Link
              to="/upload-prescription"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              <div className="text-3xl mb-3">💊</div>
              <h3 className="font-semibold mb-2">Upload Prescription</h3>
              <p className="text-sm opacity-90">Get prescription insights</p>
            </Link>

            <Link
              to="/resources"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <p className="text-sm opacity-90">Health education materials</p>
            </Link>

            <Link
              to="/about"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              <div className="text-3xl mb-3">ℹ️</div>
              <h3 className="font-semibold mb-2">About Us</h3>
              <p className="text-sm opacity-90">Learn more about HealthLingo</p>
            </Link>
          </div>
        </div>

        {/* Health Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Account Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Member Since</span>
                <span className="font-semibold text-blue-700">July 2025</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Reports Analyzed</span>
                <span className="font-semibold text-green-700">--</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Prescriptions Reviewed</span>
                <span className="font-semibold text-purple-700">--</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Health Tips
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">💧 Stay hydrated! Drink at least 8 glasses of water daily.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-700">🚶‍♂️ Take a 10-minute walk after meals to aid digestion.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-sm text-gray-700">😴 Aim for 7-9 hours of quality sleep each night.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
