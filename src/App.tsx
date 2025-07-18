// src/App.tsx

import React, { useState } from "react";
import PaletteDisplay from "./components/PlatletsPattern/PaletteDisplay";
import { getColorPaletteFromText } from "./api/openai";

const App: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    try {
      const palette = await getColorPaletteFromText(text);
      console.log('palette',palette)
      if (palette && palette.length === 5) {
        setColors(palette);
      } else {
        setError("Failed to get a valid palette. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center font-sans">
      <h1 className="text-3xl font-bold mb-6">🎨 AI Color Palette Generator</h1>

      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded mb-4 text-base"
        placeholder="Describe a mood or theme (e.g. sunset beach, retro neon)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Palette"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {colors.length > 0 && <PaletteDisplay colors={colors} />}
    </div>
  );
};

export default App;
