"use client"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { AppProvider } from "./contexts/AppContext"
import { ChessBoard } from "./components/ChessBoard"
import { GameControls } from "./components/GameControls"
import { ThemeSelector } from "./components/ThemeSelector"
import { UserProfile } from "./components/UserProfile"

export default function ChessGame() {
  return (
    <Provider store={store}>
      <AppProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Chess Game</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chess Board */}
              <div className="lg:col-span-2 flex justify-center">
                <ChessBoard />
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                <GameControls />
                <ThemeSelector />
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </AppProvider>
    </Provider>
  )
}
