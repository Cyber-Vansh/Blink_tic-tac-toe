import React from "react";
import Cell from "./Cell";
import "./Board.css";

export default function Board({
  board,
  onCellClick,
  winningCombo,
  blockedCells,
  swapActive,
  swapFrom,
}) {
  return (
    <div className="board">
      {board.map((cell, idx) => (
        <Cell
          key={idx}
          idx={idx}
          value={cell}
          onClick={() => onCellClick(idx)}
          isWinningCell={winningCombo.includes(idx)}
          isBlocked={blockedCells.includes(idx)}
          swapActive={swapActive}
          swapFrom={swapFrom}
          isSwapFrom={swapFrom === idx}
          isSwapTarget={swapActive && !cell && swapFrom !== null}
        />
      ))}
    </div>
  );
}
