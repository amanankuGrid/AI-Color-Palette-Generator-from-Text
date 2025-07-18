// src/components/PaletteDisplay.tsx

import React from "react";

interface PaletteDisplayProps {
  colors: string[];
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ colors }) => {
  return (
    <div className="flex justify-center mt-6 gap-4 flex-wrap">
      {colors.map((hex, index) => (
        <div key={index} className="text-center">
          <div
            className="w-16 h-16 rounded shadow-md border"
            style={{ backgroundColor: hex }}
            title={hex}
          ></div>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: hex ,width:'40px'}}></span>
            <span className="text-sm font-mono" style={{color:hex}}>{hex}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaletteDisplay;
