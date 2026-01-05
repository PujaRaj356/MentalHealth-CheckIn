"use client";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState<{ text: string; reply: string }[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("checkins");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // ✅ Add this function to reset history
  const resetHistory = () => {
    if (confirm("Are you sure you want to clear all your check-ins?")) {
      localStorage.removeItem("checkins"); // Clear storage
      setHistory([]); // Clear state
    }
  };

  const getMoodColor = (reply: string) => {
    if (reply.includes("Low")) return "bg-red-100 border-red-400 text-red-800";
    if (reply.includes("Medium")) return "bg-yellow-100 border-yellow-400 text-yellow-800";
    if (reply.includes("Good")) return "bg-green-100 border-green-400 text-green-800";
    return "bg-gray-100 border-gray-300 text-gray-800";
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-700">🕒 Your Check-In History</h2>
        {/* ✅ Reset button */}
        <button
          onClick={resetHistory}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
        >
          Reset History
        </button>
      </div>

      {history.length === 0 && <p className="text-gray-600">No previous check-ins yet.</p>}

      <div className="flex flex-col gap-4">
        {history.map((item, idx) => (
          <div key={idx} className={`p-4 border-l-4 rounded-lg ${getMoodColor(item.reply)}`}>
            <p className="font-semibold">You: {item.text}</p>
            <p className="mt-1 whitespace-pre-line">AI: {item.reply}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
