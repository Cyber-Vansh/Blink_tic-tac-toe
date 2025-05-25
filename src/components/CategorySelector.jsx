import React from "react";
import "./CategorySelector.css";

export default function CategorySelector({
  players,
  categories,
  onCategorySelect,
  onStart,
}) {
  return (
    <div className="setup">
      {[0, 1].map((playerIdx) => (
        <div key={playerIdx} className="player-select">
          <h2>Player {playerIdx + 1} - Choose Category</h2>
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={
                  players[playerIdx].category === cat ? "selected" : ""
                }
                onClick={() => onCategorySelect(playerIdx, cat)}
                disabled={players[1 - playerIdx].category === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="start-btn" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
}
