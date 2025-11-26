import { useState } from "react";
import "./Candle.css";

export default function Candle({ onBlow }) {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    setIsBlown(true);
    if (onBlow) onBlow();  // Sends event to parent
  };

  return (
    <div className="candle-container" onClick={handleBlow}>
      <img src="/candle_base.png" className="candle-base" />

      {!isBlown ? (
        <img src="/candle_flame.gif" className="candle-flame" />
      ) : (
        <div className="candle-smoke"></div>
      )}
    </div>
  );
}
