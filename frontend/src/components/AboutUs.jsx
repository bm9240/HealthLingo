import logo from "../assets/logo.png";

export default function AboutUs() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-300 backdrop-blur-md bg-white/80 border border-blue-200 shadow-2xl rounded-3xl p-10 max-w-2xl w-full">
        <div className="flex flex-col items-center">
          <img src={logo} alt="HealthLingo Logo" className="w-20 h-20 object-cover rounded-full mb-4 shadow"/>
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">About Us</h1>
          <p className="text-lg text-gray-700 text-center mt-2">
            Welcome to <span className="font-bold text-blue-600">HealthLingo</span>! We are dedicated to simplifying medical information and making healthcare more accessible for everyone.
          </p>
          <p className="mt-6 text-gray-700 text-center">
            Our mission is to bridge the gap between complex medical jargon and everyday understanding, empowering users to take charge of their health.
          </p>
          <p className="mt-6 text-gray-700 text-center">
            <span className="font-semibold text-blue-600">HealthLingo</span> is designed as an <span className="italic">educational tool</span>. While we aim to provide clear and useful medical explanations, we do not intend to replace qualified medical professionals or offer medical advice.
          </p>
          <p className="mt-4 text-gray-700 text-center">
            Always consult a licensed doctor or healthcare provider for any diagnosis, treatment, or medical guidance.
          </p>
        </div>
      </div>
    </div>
  );
}