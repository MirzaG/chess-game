"use client"

import type React from "react"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import type { RootState } from "../store/store"

export const CheckStatusIndicator: React.FC = () => {
  const { gameStatus, currentPlayer, isInCheck } = useSelector((state: RootState) => state.game)
  const [showResolved, setShowResolved] = useState(false)
  const [previousCheckState, setPreviousCheckState] = useState(false)

  useEffect(() => {
    // Show "Check Resolved" message when transitioning from check to playing
    if (previousCheckState && !isInCheck && gameStatus === "playing") {
      setShowResolved(true)
      const timer = setTimeout(() => {
        setShowResolved(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
    setPreviousCheckState(isInCheck)
  }, [isInCheck, gameStatus, previousCheckState])

  if (showResolved) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Check Resolved!</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
