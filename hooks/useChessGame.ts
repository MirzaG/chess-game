"use client"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import type { RootState } from "../store/store"
import {
  selectSquare,
  setValidMoves,
  makeMove,
  resetGame,
  setGameStatus,
  setCheckState,
  clearCheckState,
} from "../store/gameSlice"
import type { Position, Move } from "../types/chess"
import { getValidMoves, isSamePosition, isKingInCheck, findKing, isCheckmate, isStalemate } from "../utils/chessUtils"

export const useChessGame = () => {
  const dispatch = useDispatch()
  const gameState = useSelector((state: RootState) => state.game)

  // ───────────────────────────────────────────────────────────
  // Re-evaluate check / mate / stalemate whenever the position
  // (board + side-to-move) changes.  Dispatch only on change.
  // ───────────────────────────────────────────────────────────
  useEffect(() => {
    const { board, currentPlayer } = gameState

    const inCheck = isKingInCheck(board, currentPlayer)
    const kingPos = inCheck ? findKing(board, currentPlayer) : null
    const checkmate = inCheck && isCheckmate(board, currentPlayer)
    const stalemate = !inCheck && isStalemate(board, currentPlayer)

    // 1.  Check / clear check state  ──────────────────────────
    if (inCheck) {
      if (!gameState.isInCheck || !isSamePosition(gameState.kingInCheckPosition ?? { row: -1, col: -1 }, kingPos!)) {
        dispatch(setCheckState({ isInCheck: true, kingPosition: kingPos }))
      }
    } else if (gameState.isInCheck) {
      dispatch(clearCheckState()) // check just resolved
    }

    // 2.  Game status  ─────────────────────────────────────────
    let desiredStatus: typeof gameState.gameStatus = "playing"
    if (checkmate) desiredStatus = "checkmate"
    else if (inCheck) desiredStatus = "check"
    else if (stalemate) desiredStatus = "stalemate"

    if (gameState.gameStatus !== desiredStatus) {
      dispatch(setGameStatus(desiredStatus))
    }
    // Only run when the position really changes
  }, [gameState.board, gameState.currentPlayer, dispatch])

  const handleSquareClick = (position: Position) => {
    const { board, selectedSquare, currentPlayer, gameStatus } = gameState

    // Don't allow moves if game is over
    if (gameStatus === "checkmate" || gameStatus === "stalemate") {
      return
    }

    const piece = board[position.row][position.col]

    if (!selectedSquare) {
      // Select a piece
      if (piece && piece.color === currentPlayer) {
        dispatch(selectSquare(position))
        const validMoves = getValidMoves(board, position, piece)
        dispatch(setValidMoves(validMoves))
      }
    } else {
      // Make a move or select a different piece
      if (isSamePosition(selectedSquare, position)) {
        // Deselect
        dispatch(selectSquare(null))
        dispatch(setValidMoves([]))
      } else if (piece && piece.color === currentPlayer) {
        // Select different piece
        dispatch(selectSquare(position))
        const validMoves = getValidMoves(board, position, piece)
        dispatch(setValidMoves(validMoves))
      } else {
        // Try to make a move
        const isValidMove = gameState.validMoves.some((move) => isSamePosition(move, position))

        if (isValidMove) {
          const selectedPiece = board[selectedSquare.row][selectedSquare.col]
          if (selectedPiece) {
            const move: Move = {
              from: selectedSquare,
              to: position,
              piece: selectedPiece,
              capturedPiece: piece || undefined,
            }
            dispatch(makeMove(move))
          }
        } else {
          dispatch(selectSquare(null))
          dispatch(setValidMoves([]))
        }
      }
    }
  }

  const handleResetGame = () => {
    dispatch(resetGame())
  }

  return {
    gameState,
    handleSquareClick,
    handleResetGame,
  }
}
