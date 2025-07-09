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
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📄 Upload Medical Report</h1>

      <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
      <button onClick={uploadAndAnalyze} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
        Upload & Analyze
      </button>

      {loading && <p>⏳ Working on it...</p>}

      {answer && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold">AI Summary:</h2>
          <pre className="whitespace-pre-wrap">{answer}</pre>
          <button onClick={() => speak(answer)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
            🔊 Listen Summary
          </button>
        </div>
      )}

      {ocrContext && (
        <div className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold">❓ Ask a follow-up</h2>
          <input
            type="text"
            placeholder="e.g. What does creatinine mean?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="flex gap-3 mt-2">
            <button onClick={askFollowUp} className="bg-purple-600 text-white px-4 py-2 rounded">
              Submit Question
            </button>
            <button onClick={startVoiceInput} className="bg-yellow-500 text-white px-4 py-2 rounded">
              🎤 Ask by Voice
            </button>
          </div>
        </div>
      )}

      {followup && (
        <div className="bg-blue-100 p-4 rounded mt-4">
          <h2 className="font-semibold">🗣️ AI Answer:</h2>
          <p>{followup}</p>
          <button onClick={() => speak(followup)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
            🔊 Listen Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadReport;
