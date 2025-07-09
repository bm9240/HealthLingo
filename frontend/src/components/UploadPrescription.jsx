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
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">💊 Upload Prescription</h1>

      <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
      <button
        onClick={uploadAndAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Upload & Analyze
      </button>

      {ocrText && (
        <>
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold">Extracted Prescription Text:</h2>
            <p className="whitespace-pre-wrap">{ocrText}</p>
          </div>

          <textarea
            className="w-full p-2 border mt-4"
            rows="3"
            placeholder="Ask about your medicines, dosages or instructions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex gap-3">
            <button onClick={() => askFollowUp()} className="bg-green-600 text-white px-4 py-2 rounded">
              Submit Query
            </button>

            <button onClick={startVoiceInput} className="bg-green-500 text-white px-4 py-2 rounded">
              🎤 Ask by Voice
            </button>

            <button onClick={() => speakText(answer)} className="bg-green-600 text-white px-4 py-2 rounded">
              🔊 Listen to Answer
            </button>
          </div>
        </>
      )}

      {answer && (
        <div className="bg-green-100 p-4 rounded mt-4">
          <h2 className="font-semibold">AI Explanation:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPrescription;
