"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "../contexts/AppContext"
import { useChessComAPI } from "../hooks/useChessComAPI"

export const UserProfile: React.FC = () => {
  const { state } = useAppContext()
  const { userProfile } = state
  const { loginWithChessCom, logout, isLoading, error } = useChessComAPI()
  const [username, setUsername] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      try {
        await loginWithChessCom(username.trim())
        setUsername("")
      } catch (err) {
        console.error("Login failed:", err)
      }
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Chess.com Profile</h2>

      {!userProfile.isLoggedIn ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Chess.com Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connecting..." : "Connect to Chess.com"}
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-lg font-bold">{userProfile.username}</div>
            <div className="text-gray-600">Rating: {userProfile.rating}</div>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
