"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { ChessTheme, UserProfile } from "../types/chess"

interface AppState {
  currentTheme: ChessTheme
  availableThemes: ChessTheme[]
  userProfile: UserProfile
}

type AppAction =
  | { type: "SET_THEME"; payload: ChessTheme }
  | { type: "SET_USER_PROFILE"; payload: UserProfile }
  | { type: "LOGOUT" }

const defaultThemes: ChessTheme[] = [
  {
    name: "Classic",
    colors: {
      lightSquare: "#f0d9b5",
      darkSquare: "#b58863",
      highlight: "#ffff00",
      validMove: "#00ff00",
      check: "#ff0000",
      lastMove: "#ffff99",
    },
    pieceSet: "classic",
  },
  {
    name: "Modern",
    colors: {
      lightSquare: "#eeeed2",
      darkSquare: "#769656",
      highlight: "#baca2b",
      validMove: "#646f40",
      check: "#ff6b6b",
      lastMove: "#cdd26a",
    },
    pieceSet: "modern",
  },
  {
    name: "Dark",
    colors: {
      lightSquare: "#4a4a4a",
      darkSquare: "#2d2d2d",
      highlight: "#ffd700",
      validMove: "#32cd32",
      check: "#dc143c",
      lastMove: "#696969",
    },
    pieceSet: "dark",
  },
]

const initialState: AppState = {
  currentTheme: defaultThemes[0],
  availableThemes: defaultThemes,
  userProfile: {
    username: "",
    rating: 0,
    isLoggedIn: false,
  },
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, currentTheme: action.payload }
    case "SET_USER_PROFILE":
      return { ...state, userProfile: action.payload }
    case "LOGOUT":
      return {
        ...state,
        userProfile: { username: "", rating: 0, isLoggedIn: false },
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
