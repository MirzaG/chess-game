"use client"

import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/store"
import { setGameMode, setBotDifficulty, resetGame } from "../store/gameSlice"
import type { GameMode, BotDifficulty } from "../types/chess"

export const GameControls: React.FC = () => {
  const dispatch = useDispatch()
  const { gameMode, botDifficulty, currentPlayer, gameStatus } = useSelector((state: RootState) => state.game)

  const handleGameModeChange = (mode: GameMode) => {
    dispatch(setGameMode(mode))
    dispatch(resetGame())
  }

  const handleDifficultyChange = (difficulty: BotDifficulty) => {
    dispatch(setBotDifficulty(difficulty))
  }

  const handleReset = () => {
    dispatch(resetGame())
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Game Controls</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Game Mode:</label>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded ${
              gameMode === "two-player" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleGameModeChange("two-player")}
          >
            2 Players
          </button>
          <button
            className={`px-4 py-2 rounded ${
              gameMode === "bot" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleGameModeChange("bot")}
          >
            vs Bot
          </button>
        </div>
      </div>

      {gameMode === "bot" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Bot Difficulty:</label>
          <div className="flex space-x-2">
            {(["easy", "medium", "hard"] as BotDifficulty[]).map((difficulty) => (
              <button
                key={difficulty}
                className={`px-3 py-1 rounded text-sm ${
                  botDifficulty === difficulty ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleDifficultyChange(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-center">
          <span className="font-medium">Current Player: </span>
          <span className={`font-bold ${currentPlayer === "white" ? "text-gray-800" : "text-gray-600"}`}>
            {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
          </span>
        </div>

        <div className="text-center">
          <span className="font-medium">Status: </span>
          <span
            className={`font-bold transition-colors duration-300 ${
              gameStatus === "check"
                ? "text-red-600 animate-pulse"
                : gameStatus === "checkmate"
                  ? "text-red-800"
                  : gameStatus === "stalemate"
                    ? "text-yellow-600"
                    : "text-green-600"
            }`}
          >
            {gameStatus === "checkmate"
              ? `Checkmate! ${currentPlayer === "white" ? "Black" : "White"} wins!`
              : gameStatus === "check"
                ? `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} is in Check!`
                : gameStatus === "stalemate"
                  ? "Stalemate - Draw!"
                  : "Playing"}
          </span>
        </div>

        {(gameStatus === "checkmate" || gameStatus === "stalemate") && (
          <div className="text-center p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Game Over!</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleReset}
            >
              Start New Game
            </button>
          </div>
        )}
      </div>

      <button
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  )
}
