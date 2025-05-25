import React, { useState, useEffect } from "react";
import CategorySelector from "./CategorySelector";
import Board from "./Board";
import Popup from "./Popup";
import Help from "./Help";
import "./Game.css";

const emojiCategories = {
  Animals: ["🐶", "🐱", "🐵", "🐰"],
  Food: ["🍕", "🍟", "🍔", "🍩"],
  Sports: ["⚽", "🏀", "🏈", "🎾"],
  Faces: ["😀", "😎", "🥳", "🤖"],
  Nature: ["🌳", "🌸", "🌞", "🌈"],
  Vehicles: ["🚗", "🚲", "✈️", "🚀"],
  Music: ["🎵", "🎸", "🎹", "🎤"],
  Flags: ["🇮🇳", "🇵🇰", "🇱🇰", "🇧🇹"],
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const powerUps = ["Swap", "Double Move", "Block"];

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [players, setPlayers] = useState([
    { category: "", moves: [], usedDoubleMove: false },
    { category: "", moves: [], usedDoubleMove: false },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [powerUpActive, setPowerUpActive] = useState(false);
  const [currentPowerUp, setCurrentPowerUp] = useState(null);
  const [blockedCells, setBlockedCells] = useState([]);
  const [swapStep, setSwapStep] = useState(0);
  const [swapFrom, setSwapFrom] = useState(null);
  const [tempDoubleMoves, setTempDoubleMoves] = useState(null);

  const funMessages = [
    "🎯 Your move!",
    "⏳ Don't overthink it...",
    "😎 Show them who's boss!",
    "💥 Boom! Next move coming in...",
  ];

  const getRandomEmoji = (category) => {
    const options = emojiCategories[category];
    return options[Math.floor(Math.random() * options.length)];
  };

  const getRandomPowerUp = (playerIdx) => {
    const available = powerUps.filter((pu) => {
      if (pu === "Double Move" && players[playerIdx].usedDoubleMove)
        return false;
      return true;
    });
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleCategorySelect = (playerIdx, category) => {
    const otherIdx = 1 - playerIdx;
    if (players[otherIdx].category === category) return;
    const updated = [...players];
    updated[playerIdx] = { category, moves: [], usedDoubleMove: false };
    setPlayers(updated);
  };

  const startGame = () => {
    if (!players[0].category || !players[1].category) return;
    setGameStarted(true);
    setCurrentPowerUp(getRandomPowerUp(0));
  };

  const checkWin = (state, player) => {
    for (let combo of winningCombos) {
      if (combo.every((idx) => state[idx]?.player === player)) return combo;
    }
    return null;
  };

  const checkForWinnerAndAdvance = (updatedBoard) => {
    const combo = checkWin(updatedBoard, currentPlayer);
    if (combo) {
      setWinner(currentPlayer);
      setWinningCombo(combo);
      setTimeout(() => setShowPopup(true), 1000);
    } else {
      const nextPlayer = 1 - currentPlayer;
      setCurrentPlayer(nextPlayer);
      setCurrentPowerUp(getRandomPowerUp(nextPlayer));
    }
  };

  useEffect(() => {
    if (gameStarted && !winner) {
      setMessage(
        `Player ${currentPlayer + 1}: ${
          funMessages[Math.floor(Math.random() * funMessages.length)]
        }`
      );
    }
  }, [currentPlayer, gameStarted, winner]);

  const placeMove = (idx) => {
    const updatedBoard = [...board];
    const updatedPlayers = [...players];
    const emoji = getRandomEmoji(players[currentPlayer].category);
    if (players[currentPlayer].moves.length === 3) {
      const removed = updatedPlayers[currentPlayer].moves.shift();
      updatedBoard[removed] = null;
    }
    updatedBoard[idx] = { emoji, player: currentPlayer };
    updatedPlayers[currentPlayer].moves.push(idx);
    setBoard(updatedBoard);
    setPlayers(updatedPlayers);
    return updatedBoard;
  };

  const handleActivatePowerUp = () => {
    if (currentPowerUp === "Swap") {
      const opponent = 1 - currentPlayer;
      if (players[opponent].moves.length === 0) {
        setMessage("Opponent has no emojis to swap. Power-Up canceled.");
        setPowerUpActive(false);
        return;
      }
    }
    setPowerUpActive(true);
    setMessage(`Power-Up "${currentPowerUp}" activated!`);
  };

  const handleCellClick = (idx) => {
    if (winner || !gameStarted) return;
    if (blockedCells.includes(idx)) return;

    if (powerUpActive) {
      if (currentPowerUp === "Block") {
        if (board[idx] === null) {
          setBlockedCells([idx]);
          setPowerUpActive(false);
          checkForWinnerAndAdvance(board);
        }
        return;
      }

      if (currentPowerUp === "Swap") {
        if (swapStep === 0) {
          if (board[idx] !== null && board[idx].player !== currentPlayer) {
            setSwapFrom(idx);
            setSwapStep(1);
            setMessage("Select an empty cell to swap with.");
          }
          return;
        }
        if (swapStep === 1) {
          if (board[idx] === null) {
            const updatedBoard = [...board];
            const updatedPlayers = [...players];
            updatedBoard[idx] = board[swapFrom];
            updatedBoard[swapFrom] = null;
            const opponent = 1 - currentPlayer;
            const updatedOpponentMoves = [...players[opponent].moves];
            const moveIndex = updatedOpponentMoves.indexOf(swapFrom);
            if (moveIndex !== -1) {
              updatedOpponentMoves[moveIndex] = idx;
            }
            updatedPlayers[opponent].moves = updatedOpponentMoves;
            setBoard(updatedBoard);
            setPlayers(updatedPlayers);
            setSwapStep(0);
            setSwapFrom(null);
            setPowerUpActive(false);
            checkForWinnerAndAdvance(updatedBoard);
          }
          return;
        }
      }

      if (currentPowerUp === "Double Move") {
        let updatedBoard;

        if (!Array.isArray(tempDoubleMoves)) {
          if (board[idx] !== null) return;
          updatedBoard = placeMove(idx);
          setTempDoubleMoves([idx]);
          setMessage("Double Move: Make your second move!");
          return;
        } else if (tempDoubleMoves.length === 1) {
          if (board[idx] !== null) return;
          updatedBoard = placeMove(idx);
          setPowerUpActive(false);
          setTempDoubleMoves(null);
          const updated = [...players];
          updated[currentPlayer].usedDoubleMove = true;
          setPlayers(updated);
          checkForWinnerAndAdvance(updatedBoard);
          return;
        }
        return;
      }
    }

    if (board[idx] !== null) return;
    const updatedBoard = placeMove(idx);
    if (blockedCells.length) setBlockedCells([]);
    checkForWinnerAndAdvance(updatedBoard);
  };

  const fullReset = () => {
    setBoard(Array(9).fill(null));
    setPlayers([
      { category: "", moves: [], usedDoubleMove: false },
      { category: "", moves: [], usedDoubleMove: false },
    ]);
    setCurrentPlayer(0);
    setWinner(null);
    setWinningCombo([]);
    setMessage("");
    setGameStarted(false);
    setShowPopup(false);
    setPowerUpActive(false);
    setCurrentPowerUp(null);
    setBlockedCells([]);
    setSwapStep(0);
    setSwapFrom(null);
    setTempDoubleMoves(null);
  };

  return (
    <div className="app">
      <h1>Blink Tac Toe</h1>

      {!gameStarted ? (
        <CategorySelector
          players={players}
          categories={Object.keys(emojiCategories)}
          onCategorySelect={handleCategorySelect}
          onStart={startGame}
        />
      ) : (
        <>
          <div className="message">{message}</div>
          <div className="powerup-info">
            Current Power-Up: <strong>{currentPowerUp || "None"}</strong>
            {!powerUpActive && currentPowerUp && (
              <button
                onClick={handleActivatePowerUp}
                className="activate-powerup-btn"
              >
                Activate Power-Up
              </button>
            )}
          </div>
          <Board
            board={board}
            onCellClick={handleCellClick}
            winningCombo={winningCombo}
            blockedCells={blockedCells}
            swapActive={powerUpActive && currentPowerUp === "Swap"}
            swapFrom={swapFrom}
          />
        </>
      )}

      {showPopup && <Popup winner={winner} onRestart={fullReset} />}
      <Help />
    </div>
  );
}
