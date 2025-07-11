"use client"

import type React from "react"
import type { Position, ChessPiece } from "../types/chess"
import { useAppContext } from "../contexts/AppContext"
import { getPieceSymbol } from "../utils/chessUtils"

interface ChessSquareProps {
  position: Position
  piece: ChessPiece | null
  isSelected: boolean
  isValidMove: boolean
  isLastMove: boolean
  isKingInCheck: boolean
  onClick: (position: Position) => void
}

export const ChessSquare: React.FC<ChessSquareProps> = ({
  position,
  piece,
  isSelected,
  isValidMove,
  isLastMove,
  isKingInCheck,
  onClick,
}) => {
  const { state } = useAppContext()
  const { colors } = state.currentTheme

  const isLight = (position.row + position.col) % 2 === 0
  let backgroundColor = isLight ? colors.lightSquare : colors.darkSquare

  // Priority order: King in check (highest), Selected, Last move, Default
  if (isKingInCheck) {
    backgroundColor = colors.check
  } else if (isSelected) {
    backgroundColor = colors.highlight
  } else if (isLastMove) {
    backgroundColor = colors.lastMove
  }

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center cursor-pointer relative transition-all duration-300 hover:brightness-110 ${
        isValidMove ? "ring-4 ring-green-400 ring-opacity-60 shadow-lg shadow-green-400/50" : ""
      } ${isSelected ? "ring-4 ring-yellow-400 ring-opacity-80 shadow-lg shadow-yellow-400/50" : ""} ${
        isKingInCheck ? "ring-4 ring-red-500 ring-opacity-80 shadow-lg shadow-red-500/50 animate-pulse" : ""
      }`}
      style={{ backgroundColor }}
      onClick={() => onClick(position)}
    >
      {piece && (
        <span
          className={`text-4xl select-none transition-all duration-300 ${
            isKingInCheck ? "text-red-600 drop-shadow-lg animate-pulse" : ""
          }`}
        >
          {getPieceSymbol(piece)}
        </span>
      )}
      {isValidMove && !piece && (
        <div className="w-6 h-6 rounded-full bg-green-400 opacity-70 shadow-lg animate-pulse" />
      )}
      {isValidMove && piece && (
        <div className="absolute inset-0 rounded-full border-4 border-green-400 opacity-60 animate-pulse" />
      )}
    </div>
  )
}
