import React from "react";
import "./Cell.css";

export default function Cell({
  value,
  onClick,
  isWinningCell,
  isBlocked,
  swapActive,
  isSwapFrom,
  isSwapTarget,
}) {
  let className = "cell";
  if (isWinningCell) className += " winning-cell";
  if (isBlocked) className += " blocked-cell";
  if (swapActive && isSwapFrom) className += " swap-from-cell";
  if (swapActive && isSwapTarget) className += " swap-target-cell";

  return (
    <button className={className} onClick={onClick} disabled={isBlocked}>
      {value ? value.emoji : ""}
      {isBlocked && <span className="blocked-overlay">🚫</span>}
      {swapActive && isSwapFrom && <span className="swap-indicator">↔️</span>}
      {swapActive && isSwapTarget && <span className="swap-indicator">⬆️</span>}
    </button>
  );
}
