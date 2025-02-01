// components/ConfettiAnimation.js
import React, { useEffect, useState } from "react";
import "./APlusStyles.css";

const ConfettiAnimation = ({ trigger }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newPieces = Array.from({ length: 50 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 5 + Math.random() * 10,
        color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
      }));
      setPieces(newPieces);

      // Auto-clear the pieces after 5 seconds
      const timer = setTimeout(() => {
        setPieces([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="confetti-container">
      {pieces.map((piece, idx) => (
        <div
          key={idx}
          className="confetti-piece"
          style={{
            position: "absolute",
            top: "-10px",
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: "50%",
            animation: `fall ${piece.duration}s ease-in-out ${piece.delay}s forwards`
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;

