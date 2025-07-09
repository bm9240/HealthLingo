import React from 'react';

const resources = [
  {
    title: "Understanding Lab Tests",
    description: "What your lab results mean and how to interpret them.",
    link: "https://medlineplus.gov/lab-tests/",
    icon: "🔬",
    category: "Medical Tests"
  },
  {
    title: "Healthy Lifestyle Tips",
    description: "Guidelines for nutrition, sleep, and exercise.",
    link: "https://www.cdc.gov/healthyweight/index.html",
    icon: "💪",
    category: "Lifestyle"
  },
  {
    title: "Common Medical Conditions",
    description: "An overview of conditions like diabetes, hypertension, etc.",
    link: "https://www.mayoclinic.org/diseases-conditions",
    icon: "❤️",
    category: "Health Conditions"
  },
  {
    title: "When to See a Doctor",
    description: "Warning signs and symptoms that require medical attention.",
    link: "https://www.cdc.gov/family/checkup/index.htm",
    icon: "🩺",
    category: "Emergency Care"
  }
];

function Resources() {
  return (
    <div className="w-screen h-xl flex items-center justify-center bg-white">
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-300 backdrop-blur-md bg-white/80 border border-blue-200 shadow-2xl rounded-3xl p-6 max-w-6xl w-full h-xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 shadow">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow">
            Patient Resources
          </h1>
          <p className="text-lg text-gray-700 text-center mt-2">
            Empowering you with trusted medical information and resources to better understand your health journey
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="group bg-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200/50 w-full backdrop-blur-sm"
            >
              <div className="p-4">
                {/* Category Badge */}
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                  {resource.category}
                </div>
                
                {/* Icon and Title */}
                <div className="flex items-start space-x-2 mb-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg">{resource.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                      {resource.title}
                    </h3>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-3 text-xs">
                  {resource.description}
                </p>
                
                {/* CTA Button */}
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-3 py-1.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 text-xs"
                >
                  <span>Learn More</span>
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-4 border border-blue-200/50 w-full backdrop-blur-sm">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-2 shadow">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-blue-700 mb-1 drop-shadow">
              Disclaimer
            </h3>
            <p className="text-gray-700 text-center text-xs">
              These resources are for educational purposes only and should not replace professional medical advice. Always consult with your healthcare provider for personalized medical guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
