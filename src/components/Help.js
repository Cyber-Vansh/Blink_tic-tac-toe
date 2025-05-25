import React from "react";

export default function Help() {
  return (
    <div className="help">
      <h2>Help</h2>
      <ul>
        <li>Select an emoji category for each player before starting.</li>
        <li>Each turn assigns a random emoji from that category.</li>
        <li>Players can only have 3 emojis on the board at once.</li>
        <li>The 4th emoji removes the oldest (but not from the same cell).</li>
        <li>Line up 3 emojis horizontally, vertically, or diagonally to win.</li>
      </ul>
    </div>
  );
}
