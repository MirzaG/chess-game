import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { GameState, Position, Move, GameMode, BotDifficulty } from "../types/chess"
import { createInitialBoard } from "../utils/chessUtils"

const initialState: GameState = {
  board: createInitialBoard(),
  currentPlayer: "white",
  selectedSquare: null,
  validMoves: [],
  gameStatus: "playing",
  moveHistory: [],
  gameMode: "two-player",
  botDifficulty: "medium",
  isThinking: false,
  isInCheck: false,
  kingInCheckPosition: null,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectSquare: (state, action: PayloadAction<Position | null>) => {
      state.selectedSquare = action.payload
    },
    setValidMoves: (state, action: PayloadAction<Position[]>) => {
      state.validMoves = action.payload
    },
    makeMove: (state, action: PayloadAction<Move>) => {
      const move = action.payload
      state.board[move.to.row][move.to.col] = move.piece
      state.board[move.from.row][move.from.col] = null
      state.moveHistory.push(move)
      state.currentPlayer = state.currentPlayer === "white" ? "black" : "white"
      state.selectedSquare = null
      state.validMoves = []
    },
    setGameStatus: (state, action: PayloadAction<GameState["gameStatus"]>) => {
      state.gameStatus = action.payload
    },
    setCheckState: (state, action: PayloadAction<{ isInCheck: boolean; kingPosition: Position | null }>) => {
      state.isInCheck = action.payload.isInCheck
      state.kingInCheckPosition = action.payload.kingPosition
    },
    clearCheckState: (state) => {
      state.isInCheck = false
      state.kingInCheckPosition = null
      if (state.gameStatus === "check") {
        state.gameStatus = "playing"
      }
    },
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload
    },
    setBotDifficulty: (state, action: PayloadAction<BotDifficulty>) => {
      state.botDifficulty = action.payload
    },
    setBotThinking: (state, action: PayloadAction<boolean>) => {
      state.isThinking = action.payload
    },
    resetGame: (state) => {
      state.board = createInitialBoard()
      state.currentPlayer = "white"
      state.selectedSquare = null
      state.validMoves = []
      state.gameStatus = "playing"
      state.moveHistory = []
      state.isThinking = false
      state.isInCheck = false
      state.kingInCheckPosition = null
    },
  },
})

export const {
  selectSquare,
  setValidMoves,
  makeMove,
  setGameStatus,
  setCheckState,
  clearCheckState,
  setGameMode,
  setBotDifficulty,
  setBotThinking,
  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
