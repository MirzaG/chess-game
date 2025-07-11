export type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king"
export type PieceColor = "white" | "black"
export type GameMode = "two-player" | "bot"
export type BotDifficulty = "easy" | "medium" | "hard"
export type GameStatus = "playing" | "check" | "checkmate" | "stalemate" | "draw"

export interface ChessPiece {
  type: PieceType
  color: PieceColor
  hasMoved?: boolean
}

export interface Position {
  row: number
  col: number
}

export interface Move {
  from: Position
  to: Position
  piece: ChessPiece
  capturedPiece?: ChessPiece
  isEnPassant?: boolean
  isCastling?: boolean
  promotion?: PieceType
}

export interface GameState {
  board: (ChessPiece | null)[][]
  currentPlayer: PieceColor
  selectedSquare: Position | null
  validMoves: Position[]
  gameStatus: GameStatus
  moveHistory: Move[]
  gameMode: GameMode
  botDifficulty: BotDifficulty
  isThinking: boolean
  isInCheck: boolean
  kingInCheckPosition: Position | null
}

export interface ThemeColors {
  lightSquare: string
  darkSquare: string
  highlight: string
  validMove: string
  check: string
  lastMove: string
}

export interface ChessTheme {
  name: string
  colors: ThemeColors
  pieceSet: string
}

export interface UserProfile {
  username: string
  rating: number
  isLoggedIn: boolean
}
