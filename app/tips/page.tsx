export default function TipsPage() {
  const tips = [
    "Take 5 deep breaths 🧘‍♂️",
    "Go for a 10-minute walk 🚶‍♀️",
    "Drink a glass of water 💧",
    "Write down 3 things you're grateful for ✍️",
    "Stretch your arms and neck for 2 minutes 💪",
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">🌟 Self-Care Tips</h2>
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li
            key={idx}
            className="p-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl shadow-md font-semibold"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
