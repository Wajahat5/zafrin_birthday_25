import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Cake({ onBlow }) {
  const [flameOut, setFlameOut] = useState(false);

  const blow = () => {
    setFlameOut(true);
    if (onBlow) onBlow();
  };

  return (
    <div className="relative w-40 h-40 flex flex-col items-center">
      {/* Flame or smoke */}
      {!flameOut ? (
        <motion.div
          className="text-4xl"
          animate={{ y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          🔥
        </motion.div>
      ) : (
        <motion.div
          className="text-3xl opacity-70"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -20, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          💨
        </motion.div>
      )}

      {/* Candle */}
      <div
        onClick={blow}
        className="w-3 h-12 bg-yellow-200 border border-yellow-400 rounded cursor-pointer flex items-center justify-center"
      ></div>

      {/* Cake body */}
      <div className="w-40 h-24 bg-pink-300 rounded-xl mt-2 shadow-inner flex items-center justify-center text-xl">
        🎂
      </div>
    </div>
  );
}
