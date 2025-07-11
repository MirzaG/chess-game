"use client"

import type React from "react"
import { useAppContext } from "../contexts/AppContext"

export const ThemeSelector: React.FC = () => {
  const { state, dispatch } = useAppContext()
  const { currentTheme, availableThemes } = state

  const handleThemeChange = (theme: any) => {
    dispatch({ type: "SET_THEME", payload: theme })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Themes</h2>

      <div className="space-y-3">
        {availableThemes.map((theme) => (
          <div
            key={theme.name}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              currentTheme.name === theme.name ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleThemeChange(theme)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{theme.name}</span>
              <div className="flex space-x-1">
                <div className="w-6 h-6 rounded border" style={{ backgroundColor: theme.colors.lightSquare }} />
                <div className="w-6 h-6 rounded border" style={{ backgroundColor: theme.colors.darkSquare }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
