"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ text: string; reply: string }[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("checkins");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleCheckIn = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:3001/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      const reply = res.ok ? data.reply : "Error: " + (data.error || "Something went wrong");

      setResponse(reply);

      if (res.ok) {
        const newHistory = [{ text, reply }, ...history];
        setHistory(newHistory);
        localStorage.setItem("checkins", JSON.stringify(newHistory));
      }

      setText("");
    } catch (err) {
      console.error(err);
      setResponse("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (reply: string) => {
    if (reply.includes("Low")) return "bg-red-100 border-red-400 text-red-800";
    if (reply.includes("Medium")) return "bg-yellow-100 border-yellow-400 text-yellow-800";
    if (reply.includes("Good")) return "bg-green-100 border-green-400 text-green-800";
    return "bg-gray-100 border-gray-300 text-gray-800";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center tracking-wide">🌸 Mental Health Check-In</h1>
      </header>

      {/* Hero */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <h2 className="text-4xl font-bold text-purple-700 mb-3">Check in on your mental health</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Share how you feel today and get a supportive AI response along with a simple self-care suggestion.
        </p>
      </section>

      {/* Main content */}
      <main className="flex flex-col md:flex-row justify-center gap-8 px-4 py-12">
        {/* Check-in card */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 w-full md:w-96 flex flex-col hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 text-purple-700">📝 Your Check-In</h3>
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today?"
            className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 resize-none"
          />
          <button
            onClick={handleCheckIn}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Checking in..." : "Check In"}
          </button>

          {/* AI Response */}
          {response && (
            <div className={`mt-6 p-4 border-l-4 rounded-lg ${getMoodColor(response)} animate-fade-in`}>
              <p className="font-medium">🤖 AI Response:</p>
              <p className="whitespace-pre-line">{response}</p>
            </div>
          )}
        </div>

        {/* History panel */}
        {history.length > 0 && (
          <div className="bg-white shadow-2xl rounded-2xl p-6 w-full md:w-96 max-h-[600px] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">🕒 Previous Check-Ins</h3>
            {history.map((h, idx) => (
              <div
                key={idx}
                className={`mb-3 p-3 border-l-4 rounded-lg ${getMoodColor(h.reply)} hover:shadow-md transition-shadow duration-200`}
              >
                <p className="font-medium">You: {h.text}</p>
                <p className="mt-1 whitespace-pre-line">{h.reply}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-purple-50 text-center py-6 mt-auto text-purple-800">
        <p>© 2026 Mental Health Check-In 🌸 Built with care</p>
      </footer>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
