import React from "react";
import "./Help.css";

export default function Help() {
  return (
    <div className="help">
      <h2>Help</h2>
      <ul>
        <li>Each player selects an emoji category before the game begins.</li>
        <li>Each move places a random emoji from the selected category.</li>
        <li>
          Players can have only <strong>3 emojis</strong> on the board at a
          time. Placing a 4th will remove the oldest one.
        </li>
        <li>
          Get 3 of your emojis in a row — horizontally, vertically, or
          diagonally — to win!
        </li>
        <li>
          Each turn, players receive a random power-up which can be activated
          once per turn:
        </li>
        <ul>
          <li>
            <strong>Swap</strong>: Swap an opponent's emoji with an empty cell.
          </li>
          <li>
            <strong>Double Move</strong>: Place two emojis in a single turn
            (once per player).
          </li>
          <li>
            <strong>Block</strong>: Block an empty cell to prevent the opponent
            from using it.
          </li>
        </ul>
        <li>Use power-ups strategically — timing is everything!</li>
        <li>
          ⚠️ Note: Activating a power-up does <strong>not</strong> grant an
          extra turn; your turn ends after using it.
        </li>
      </ul>
    </div>
  );
}
