"use client"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import type { RootState } from "../store/store"
import { makeMove, setBotThinking } from "../store/gameSlice"
import type { Move, BotDifficulty } from "../types/chess"
import { getLegalMoves } from "../utils/chessUtils"

export const useChessBot = () => {
  const dispatch = useDispatch()
  const { board, currentPlayer, gameMode, botDifficulty, isThinking } = useSelector((state: RootState) => state.game)

  useEffect(() => {
    if (gameMode === "bot" && currentPlayer === "black" && !isThinking) {
      dispatch(setBotThinking(true))

      const delay = botDifficulty === "easy" ? 500 : botDifficulty === "medium" ? 1000 : 1500

      setTimeout(() => {
        const botMove = getBotMove(board, botDifficulty)
        if (botMove) {
          dispatch(makeMove(botMove))
        }
        dispatch(setBotThinking(false))
      }, delay)
    }
  }, [currentPlayer, gameMode, board, botDifficulty, isThinking, dispatch])

  return { isThinking }
}

const getBotMove = (board: any[][], difficulty: BotDifficulty): Move | null => {
  const allMoves: Move[] = []

  // Get all possible legal moves for black pieces
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.color === "black") {
        const position = { row, col }
        const validMoves = getLegalMoves(board, position, piece)

        for (const move of validMoves) {
          allMoves.push({
            from: position,
            to: move,
            piece,
            capturedPiece: board[move.row][move.col] || undefined,
          })
        }
      }
    }
  }

  if (allMoves.length === 0) return null

  switch (difficulty) {
    case "easy":
      // Random move
      return allMoves[Math.floor(Math.random() * allMoves.length)]

    case "medium":
      // Prefer captures, otherwise random
      const captureMoves = allMoves.filter((move) => move.capturedPiece)
      if (captureMoves.length > 0) {
        return captureMoves[Math.floor(Math.random() * captureMoves.length)]
      }
      return allMoves[Math.floor(Math.random() * allMoves.length)]

    case "hard":
      // Simple evaluation: prioritize captures and center control
      const evaluatedMoves = allMoves.map((move) => ({
        move,
        score: evaluateMove(move, board),
      }))

      evaluatedMoves.sort((a, b) => b.score - a.score)
      return evaluatedMoves[0].move

    default:
      return allMoves[Math.floor(Math.random() * allMoves.length)]
  }
}

const evaluateMove = (move: Move, board: any[][]): number => {
  let score = 0

  // Capture bonus
  if (move.capturedPiece) {
    const pieceValues = { pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 100 }
    score += pieceValues[move.capturedPiece.type] * 10
  }

  // Center control bonus
  const centerSquares = [
    { row: 3, col: 3 },
    { row: 3, col: 4 },
    { row: 4, col: 3 },
    { row: 4, col: 4 },
  ]

  if (centerSquares.some((pos) => pos.row === move.to.row && pos.col === move.to.col)) {
    score += 2
  }

  return score
}
