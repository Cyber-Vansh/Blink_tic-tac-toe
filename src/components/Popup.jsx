import React from "react";
import "./Popup.css";

export default function Popup({ winner, onRestart }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>🎉 Player {winner + 1} Wins! 🎉</h2>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
}
