import React, { useState } from "react";

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [ocrContext, setOcrContext] = useState(""); // ✨ to keep OCRed text for follow-up
  const [question, setQuestion] = useState("");
  const [followup, setFollowup] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAndAnalyze = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.results) {
        const summary = data.results
          .map(
            (item) =>
              `🧪 ${item.Test} = ${item.Result || "N/A"} ${item.Unit || ""} (${item.Status || "N/A"})\n→ ${item.Explanation || "No explanation"}`
          )
          .join("\n\n");

        setAnswer(summary);
        setOcrContext(JSON.stringify(data.results)); // Keep context for follow-up
      } else {
        setAnswer("❌ Something went wrong.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setAnswer("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const askFollowUp = async () => {
    if (!question) return alert("Please ask something!");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question, context: ocrContext }),
      });

      const data = await res.json();
      setFollowup(data.explanation || "No response.");
    } catch (err) {
      console.error("Follow-up error:", err);
      setFollowup("❌ Could not process your question.");
    } finally {
      setLoading(false);
    }
  };

  // 🎤 Voice input
  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      askFollowUp();
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      console.error("Voice error:", e);
      setIsListening(false);
    };
  };

  // 🔊 Speak any text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 font-sans pt-16">
      <div className="bg-white/80 backdrop-blur-md border border-blue-200 shadow-2xl rounded-3xl p-10 max-w-2xl w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 shadow">
            <span className="text-3xl">📄</span>
          </div>
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">Upload Medical Report</h1>
          <p className="text-lg text-gray-700 text-center mt-2">
            Get clear, AI-powered explanations of your medical test results and ask follow-up questions easily.
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

        {loading && <p className="text-center text-blue-700 mt-4">⏳ Working on it...</p>}

        {answer && (
          <div className="bg-gray-100 p-4 rounded shadow mt-8">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">AI Summary:</h2>
            <pre className="whitespace-pre-wrap text-gray-800 text-sm">{answer}</pre>
            <button
              onClick={() => speak(answer)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              🔊 Listen Summary
            </button>
          </div>
        )}

        {ocrContext && (
          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold text-blue-700">❓ Ask a follow-up</h2>
            <input
              type="text"
              placeholder="e.g. What does creatinine mean?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              <button
                onClick={askFollowUp}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Submit Question
              </button>
              <button
                onClick={startVoiceInput}
                className={`bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition ${isListening ? "animate-pulse" : ""}`}
              >
                🎤 {isListening ? "Listening..." : "Ask by Voice"}
              </button>
            </div>
          </div>
        )}

        {followup && (
          <div className="bg-blue-100 p-4 rounded mt-4 shadow">
            <h2 className="font-semibold text-blue-700 mb-2">🗣️ AI Answer:</h2>
            <p className="text-gray-800">{followup}</p>
            <button
              onClick={() => speak(followup)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              🔊 Listen Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReport;