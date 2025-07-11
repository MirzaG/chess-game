"use client"

import type React from "react"
import { ChessSquare } from "./ChessSquare"
import { useChessGame } from "../hooks/useChessGame"
import { useChessBot } from "../hooks/useChessBot"
import { isSamePosition } from "../utils/chessUtils"
import { CheckStatusIndicator } from "./CheckStatusIndicator"

export const ChessBoard: React.FC = () => {
  const { gameState, handleSquareClick } = useChessGame()
  const { isThinking } = useChessBot()
  const { board, selectedSquare, validMoves, moveHistory, isInCheck, kingInCheckPosition } = gameState

  const lastMove = moveHistory[moveHistory.length - 1]

  return (
    <div className="relative" style={{height: '520px'}}>
      <CheckStatusIndicator />
      <div className="grid grid-cols-8 border-4 border-gray-800 shadow-2xl rounded-lg overflow-hidden">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const position = { row: rowIndex, col: colIndex }
            const isSelected = selectedSquare && isSamePosition(selectedSquare, position)
            const isValidMove = validMoves.some((move) => isSamePosition(move, position))
            const isLastMove =
              lastMove && (isSamePosition(lastMove.from, position) || isSamePosition(lastMove.to, position))
            const isKingInCheck =
              isInCheck &&
              kingInCheckPosition &&
              isSamePosition(kingInCheckPosition, position) &&
              piece?.type === "king"

            return (
              <ChessSquare
                key={`${rowIndex}-${colIndex}`}
                position={position}
                piece={piece}
                isSelected={!!isSelected}
                isValidMove={isValidMove}
                isLastMove={!!isLastMove}
                isKingInCheck={!!isKingInCheck}
                onClick={handleSquareClick}
              />
            )
          }),
        )}
      </div>

      {/* Row and column labels */}
      <div className="absolute -left-6 top-0 h-full flex flex-col justify-around text-sm font-bold">
        {["8", "7", "6", "5", "4", "3", "2", "1"].map((label) => (
          <div key={label} className="h-16 flex items-center">
            {label}
          </div>
        ))}
      </div>

      <div className="absolute -bottom-6 left-0 w-full flex justify-around text-sm font-bold">
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((label) => (
          <div key={label} className="w-16 flex justify-center">
            {label}
          </div>
        ))}
      </div>

      {isThinking && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span>Bot is thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
