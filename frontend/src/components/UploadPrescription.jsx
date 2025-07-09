// components/UploadPrescription.jsx
import React, { useState } from "react";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Upload and analyze prescription
  const uploadAndAnalyze = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload-prescription", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setOcrText(data.text);           // OCR content
      setAnswer(data.explanation);     // AI explanation
    } catch (err) {
      console.error(err);
      setAnswer("Error processing prescription.");
    }
  };

  // ✅ Text-to-speech
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // ✅ Speech-to-text input
  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      askFollowUp(transcript);
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      console.error("Voice input error:", e);
      setIsListening(false);
    };
  };

  // ✅ Ask further questions about prescription
  const askFollowUp = async (q = query) => {
    try {
      const res = await fetch("http://localhost:8000/follow-up-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, context: ocrText }),
      });

      const data = await res.json();
      setAnswer(data.explanation);
    } catch (err) {
      console.error("Follow-up error:", err);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 font-sans pt-16">
      <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-2xl rounded-3xl p-10 max-w-2xl w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 shadow">
            <span className="text-3xl">💊</span>
          </div>
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">Upload Prescription</h1>
          <p className="text-lg text-gray-700 text-center mt-2">
            Get clear explanations about your medications, dosages, and instructions in easy-to-understand language.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
          />
          <span className="text-xs text-gray-500">You can only upload files in <b>JPG</b> or <b>PNG</b> format.</span>
          <button
            onClick={uploadAndAnalyze}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md"
          >
            Upload & Analyze
          </button>
        </div>

        {ocrText && (
          <div className="mt-8">
            <div className="bg-gray-100 p-4 rounded shadow mb-4">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Extracted Prescription Text:</h2>
              <p className="whitespace-pre-wrap text-gray-800 text-sm">{ocrText}</p>
            </div>

            <textarea
              className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none mb-4"
              rows="3"
              placeholder="Ask about your medicines, dosages or instructions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => askFollowUp()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Submit Query
              </button>
              <button
                onClick={startVoiceInput}
                className={`bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition ${isListening ? "animate-pulse" : ""}`}
              >
                🎤 {isListening ? "Listening..." : "Ask by Voice"}
              </button>
              <button
                onClick={() => speakText(answer)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                🔊 Listen to Answer
              </button>
            </div>
          </div>
        )}

        {answer && (
          <div className="bg-green-100 p-4 rounded mt-6 shadow">
            <h2 className="font-semibold text-green-700 mb-2">AI Explanation:</h2>
            <p className="text-gray-800">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPrescription;