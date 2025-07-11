# 🏁 Chess Game

A comprehensive 2D chess game built with React, Redux, and TypeScript featuring both human vs human and AI gameplay modes.

# The Game Screenshot
<img width="1898" height="805" alt="image" src="https://github.com/user-attachments/assets/fc9fb822-c64d-4707-a2c7-3e6c22a3bf5b" />

## 📁 Project Structure

```bash
chess-game/
├── components/           # React components
│   ├── ChessBoard.tsx   # Main game board
│   ├── ChessSquare.tsx  # Individual squares
│   ├── GameControls.tsx # Game management
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useChessGame.ts  # Main game logic
│   ├── useChessBot.ts   # AI opponent logic
│   └── useChessComAPI.ts # API integration
├── store/               # Redux store
│   ├── gameSlice.ts     # Game state management
│   └── store.ts         # Store configuration
├── contexts/            # React Context providers
│   └── AppContext.tsx   # App-level state
├── types/               # TypeScript definitions
│   └── chess.ts         # Game type definitions
├── utils/               # Utility functions
│   └── chessUtils.ts    # Chess logic and rules
└── app/                 # Next.js app directory
    ├── page.tsx         # Main page
    └── layout.tsx       # App layout
```


## ✨ Features

### 🎮 Game Modes
- **Two Player Mode**: Local multiplayer for human vs human games
- **Bot Mode**: Play against AI with three difficulty levels

### 🤖 AI Difficulty Levels
- **Easy**: Random move selection
- **Medium**: Prioritizes captures, otherwise random
- **Hard**: Evaluates moves with piece values and positional play

### 🎯 Chess Rules in place
- **Complete Move Validation**: All standard chess piece movements
- **Check Detection**: Automatic detection with visual king highlighting
- **Checkmate & Stalemate**: Proper game ending conditions
- **Legal Moves Only**: Prevents moves that leave king in check

### 🎨 Visual Features
- **Move Highlighting**: Glowing effects for available moves
- **Check Indicators**: Red highlighting and pulsing animations for kings in check
- **Smooth Animations**: Polished transitions and visual feedback
- **Multiple Themes**: Classic, Modern, and Dark color schemes
- **Responsive Design**: Works on desktop and mobile devices

### 🔗 Chess.com Integration(Mock implementaion)
- **Profile Connection**: Login with Chess.com username (simulated)
- **Rating Display**: Shows player rating after connection
- **Profile Management**: Easy login/logout functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MirzaG/chess-game.git
   cd chess-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **Next.js 15**: App Router for routing and SSR capabilities
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling

### State Management
- **Redux Toolkit**: Game state management (moves, board, game status)
- **React Context**: App-level state (themes, user profiles)
- **Custom Hooks**: Reusable logic for chess rules and API calls

### Key Components
- **Fine-grained Architecture**: Modular component design
- **ChessBoard**: Main game board with 8x8 grid
- **ChessSquare**: Individual squares with piece rendering
- **GameControls**: Mode selection and game management
- **ThemeSelector**: Visual theme customization
- **UserProfile**: Chess.com integration interface

## 🎮 How to Play

### Basic Controls
1. **Select a Piece**: Click on any of your pieces to see available moves
2. **Make a Move**: Click on a highlighted square to move your piece
3. **Deselect**: Click the same piece again to deselect

### Game Modes
- **Two Player**: Take turns on the same device
- **vs Bot**: Play against AI - select difficulty in the controls panel

### Visual Indicators
- **🟡 Yellow Glow**: Selected piece
- **🟢 Green Glow**: Available moves
- **🔴 Red Glow**: King in check (with pulsing animation)
- **📍 Highlighted**: Last move made

## 🎨 Themes

Choose from three beautiful themes:

### Classic Theme
- Light squares: Cream (#f0d9b5)
- Dark squares: Brown (#b58863)
- Traditional chess board appearance

### Modern Theme  
- Light squares: Light green (#eeeed2)
- Dark squares: Forest green (#769656)
- Contemporary clean look

### Dark Theme
- Light squares: Dark gray (#4a4a4a)
- Dark squares: Charcoal (#2d2d2d)
- Perfect for low-light gaming

## 🤖 AI Implementation

The chess bot uses different strategies based on difficulty:

### Easy Mode
- Completely random move selection
- No strategic considerations
- Good for beginners

### Medium Mode
- Prioritizes capturing opponent pieces
- Falls back to random moves when no captures available
- Balanced challenge level

### Hard Mode
- Evaluates moves using piece values
- Considers positional factors like center control
- Provides a challenging opponent

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. Chess.com integration is simulated by default.

### Customization
- **Themes**: Modify `contexts/AppContext.tsx` to add new color schemes
- **AI Difficulty**: Adjust evaluation functions in `hooks/useChessBot.ts`
- **Board Size**: Update grid dimensions in `components/ChessBoard.tsx`

## 🔮 Future Enhancements

- [ ] **Online Multiplayer**: WebSocket-based real-time games
- [ ] **Move History**: Complete game notation and replay
- [ ] **Advanced AI**: Minimax algorithm with alpha-beta pruning
- [ ] **Chess Puzzles**: Daily tactical challenges
- [ ] **Tournament Mode**: Multi-player tournament brackets
- [ ] **Real Chess.com API**: Authentic OAuth integration
- [ ] **Sound Effects**: Audio feedback for moves and captures
- [ ] **Mobile App**: React Native version for mobile devices

---

**Made with ❤️ by Mirza Usman Tahir**

*Enjoy your chess games! ♟️*
