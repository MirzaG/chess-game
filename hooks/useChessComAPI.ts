"use client"

import { useState } from "react"
import { useAppContext } from "../contexts/AppContext"

export const useChessComAPI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { dispatch } = useAppContext()

  const loginWithChessCom = async (username: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate Chess.com API call
      // In a real implementation, you would use OAuth and actual API endpoints
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate fetching user data
      const mockUserData = {
        username,
        rating: Math.floor(Math.random() * 1000) + 800, // Random rating between 800-1800
        isLoggedIn: true,
      }

      dispatch({ type: "SET_USER_PROFILE", payload: mockUserData })
      setIsLoading(false)
      return mockUserData
    } catch (err) {
      setError("Failed to connect to Chess.com")
      setIsLoading(false)
      throw err
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return {
    loginWithChessCom,
    logout,
    isLoading,
    error,
  }
}
