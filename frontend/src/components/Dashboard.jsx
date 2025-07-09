// Dashboard.jsx
import React, { useState } from "react";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);

  // ✅ Voice Input Logic
  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript); // set query from voice
      handleSubmit(transcript); // send to backend
      setIsListening(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };
  };

  // ✅ Voice Output Logic
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  // ✅ Handle submit (either typed or spoken)
  const handleSubmit = async (inputText = query) => {
    try {
      const res = await fetch("http://localhost:8000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputText }),
      });

      const data = await res.json();
      setAnswer(data.explanation); // Example response field
    } catch (err) {
      console.error("API Error:", err);
      setAnswer("Sorry, something went wrong.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🩺 Health Dashboard</h1>

      <textarea
        className="w-full border p-2 rounded mb-4"
        placeholder="Type your question here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

        <button
          onClick={startVoiceInput}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          🎤 Ask by Voice
        </button>

        <button
          onClick={() => speakText(answer)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🔊 Listen to Answer
        </button>
      </div>

      {answer && (
        <div className="border p-4 rounded bg-gray-100">
          <strong>AI Response:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
