import type { ChessPiece, Position, PieceColor, PieceType } from "../types/chess"

export const createInitialBoard = (): (ChessPiece | null)[][] => {
  const board: (ChessPiece | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: "pawn", color: "black" }
    board[6][col] = { type: "pawn", color: "white" }
  }

  // Place other pieces
  const pieceOrder: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]

  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: pieceOrder[col], color: "black" }
    board[7][col] = { type: pieceOrder[col], color: "white" }
  }

  return board
}

export const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8
}

export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.row === pos2.row && pos1.col === pos2.col
}

const getPawnMoves = (board: (ChessPiece | null)[][], pos: Position, color: PieceColor): Position[] => {
  const moves: Position[] = []
  const direction = color === "white" ? -1 : 1
  const startRow = color === "white" ? 6 : 1

  // Forward move
  const oneStep = { row: pos.row + direction, col: pos.col }
  if (isValidPosition(oneStep) && !board[oneStep.row][oneStep.col]) {
    moves.push(oneStep)

    // Two steps from starting position
    if (pos.row === startRow) {
      const twoSteps = { row: pos.row + 2 * direction, col: pos.col }
      if (isValidPosition(twoSteps) && !board[twoSteps.row][twoSteps.col]) {
        moves.push(twoSteps)
      }
    }
  }

  // Diagonal captures
  const captureLeft = { row: pos.row + direction, col: pos.col - 1 }
  const captureRight = { row: pos.row + direction, col: pos.col + 1 }

  if (isValidPosition(captureLeft) && board[captureLeft.row][captureLeft.col]?.color !== color) {
    moves.push(captureLeft)
  }
  if (isValidPosition(captureRight) && board[captureRight.row][captureRight.col]?.color !== color) {
    moves.push(captureRight)
  }

  return moves
}

const getRookMoves = (board: (ChessPiece | null)[][], pos: Position, color: PieceColor): Position[] => {
  const moves: Position[] = []
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  for (const [dRow, dCol] of directions) {
    for (let i = 1; i < 8; i++) {
      const newPos = { row: pos.row + i * dRow, col: pos.col + i * dCol }
      if (!isValidPosition(newPos)) break

      const piece = board[newPos.row][newPos.col]
      if (!piece) {
        moves.push(newPos)
      } else {
        if (piece.color !== color) moves.push(newPos)
        break
      }
    }
  }

  return moves
}

const getKnightMoves = (board: (ChessPiece | null)[][], pos: Position, color: PieceColor): Position[] => {
  const moves: Position[] = []
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ]

  for (const [dRow, dCol] of knightMoves) {
    const newPos = { row: pos.row + dRow, col: pos.col + dCol }
    if (isValidPosition(newPos)) {
      const piece = board[newPos.row][newPos.col]
      if (!piece || piece.color !== color) {
        moves.push(newPos)
      }
    }
  }

  return moves
}

const getBishopMoves = (board: (ChessPiece | null)[][], pos: Position, color: PieceColor): Position[] => {
  const moves: Position[] = []
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]

  for (const [dRow, dCol] of directions) {
    for (let i = 1; i < 8; i++) {
      const newPos = { row: pos.row + i * dRow, col: pos.col + i * dCol }
      if (!isValidPosition(newPos)) break

      const piece = board[newPos.row][newPos.col]
      if (!piece) {
        moves.push(newPos)
      } else {
        if (piece.color !== color) moves.push(newPos)
        break
      }
    }
  }

  return moves
}

const getQueenMoves = (board: (ChessPiece | null)[][], pos: Position, color: PieceColor): Position[] => {
  return [...getRookMoves(board, pos, color), ...getBishopMoves(board, pos, color)]
}

const getKingMoves = (board: (ChessPiece | null)[][], pos: Position, color: PieceColor): Position[] => {
  const moves: Position[] = []
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (const [dRow, dCol] of directions) {
    const newPos = { row: pos.row + dRow, col: pos.col + dCol }
    if (isValidPosition(newPos)) {
      const piece = board[newPos.row][newPos.col]
      if (!piece || piece.color !== color) {
        moves.push(newPos)
      }
    }
  }

  return moves
}

export const getPieceSymbol = (piece: ChessPiece): string => {
  const symbols = {
    white: { king: "♔", queen: "♕", rook: "♖", bishop: "♗", knight: "♘", pawn: "♙" },
    black: { king: "♚", queen: "♛", rook: "♜", bishop: "♝", knight: "♞", pawn: "♟" },
  }
  return symbols[piece.color][piece.type]
}

export const isKingInCheck = (board: (ChessPiece | null)[][], color: PieceColor): boolean => {
  const kingPosition = findKing(board, color)
  if (!kingPosition) return false

  return isSquareUnderAttack(board, kingPosition, color === "white" ? "black" : "white")
}

export const findKing = (board: (ChessPiece | null)[][], color: PieceColor): Position | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.type === "king" && piece.color === color) {
        return { row, col }
      }
    }
  }
  return null
}

export const isSquareUnderAttack = (
  board: (ChessPiece | null)[][],
  position: Position,
  byColor: PieceColor,
): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.color === byColor) {
        const attackingMoves = getValidMovesWithoutCheckValidation(board, { row, col }, piece)
        if (attackingMoves.some((move) => isSamePosition(move, position))) {
          return true
        }
      }
    }
  }
  return false
}

export const getValidMovesWithoutCheckValidation = (
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece,
): Position[] => {
  const moves: Position[] = []

  switch (piece.type) {
    case "pawn":
      moves.push(...getPawnMoves(board, position, piece.color))
      break
    case "rook":
      moves.push(...getRookMoves(board, position, piece.color))
      break
    case "knight":
      moves.push(...getKnightMoves(board, position, piece.color))
      break
    case "bishop":
      moves.push(...getBishopMoves(board, position, piece.color))
      break
    case "queen":
      moves.push(...getQueenMoves(board, position, piece.color))
      break
    case "king":
      moves.push(...getKingMoves(board, position, piece.color))
      break
  }

  return moves.filter(isValidPosition)
}

export const isMoveLegal = (
  board: (ChessPiece | null)[][],
  from: Position,
  to: Position,
  piece: ChessPiece,
): boolean => {
  // Create a copy of the board with the move applied
  const newBoard = board.map((row) => [...row])
  newBoard[to.row][to.col] = piece
  newBoard[from.row][from.col] = null

  // Check if the king would be in check after this move
  return !isKingInCheck(newBoard, piece.color)
}

export const getLegalMoves = (board: (ChessPiece | null)[][], position: Position, piece: ChessPiece): Position[] => {
  const allMoves = getValidMovesWithoutCheckValidation(board, position, piece)
  return allMoves.filter((move) => isMoveLegal(board, position, move, piece))
}

export const isCheckmate = (board: (ChessPiece | null)[][], color: PieceColor): boolean => {
  if (!isKingInCheck(board, color)) return false

  // Check if any piece can make a legal move
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.color === color) {
        const legalMoves = getLegalMoves(board, { row, col }, piece)
        if (legalMoves.length > 0) {
          return false
        }
      }
    }
  }
  return true
}

export const isStalemate = (board: (ChessPiece | null)[][], color: PieceColor): boolean => {
  if (isKingInCheck(board, color)) return false

  // Check if any piece can make a legal move
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.color === color) {
        const legalMoves = getLegalMoves(board, { row, col }, piece)
        if (legalMoves.length > 0) {
          return false
        }
      }
    }
  }
  return true
}

// Update the main getValidMoves function to use legal moves
export const getValidMoves = (board: (ChessPiece | null)[][], position: Position, piece: ChessPiece): Position[] => {
  return getLegalMoves(board, position, piece)
}
