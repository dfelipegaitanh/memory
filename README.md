# Memory Game

A simple memory card matching game built with Vue.js and styled with Tailwind CSS.

## Overview

This memory game challenges players to find matching pairs of cards by flipping them two at a time. The game tracks the number of moves and matches, providing a satisfying challenge for players of all ages.

## Features

- Responsive design that works on desktop and mobile devices
- Clean, minimalist UI using Tailwind CSS
- Game state tracking (moves, matches)
- Card flipping animations
- Randomized card placement for replayability
- Game completion detection and congratulations message

## How to Play

1. Click the "Start Game" button to begin
2. Click on any card to flip it and reveal its symbol
3. Click on a second card to try to find a match
4. If the cards match, they stay face up
5. If they don't match, they flip back over
6. Continue until all pairs are matched
7. Try to complete the game in as few moves as possible!

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/memory-game.git
cd memory-game
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Future Features

Here are some features planned for future implementation:

### Game Enhancements
- Multiple difficulty levels (easy, medium, hard) with different grid sizes
- Timer to track how long it takes to complete the game
- High score tracking using local storage
- Sound effects for card flips and matches
- Background music with toggle option
- Themes with different card designs and symbols

### Technical Enhancements
- State management with Vuex or Pinia for more complex game states
- User accounts and online high score leaderboard
- Multiplayer mode for competing with friends
- Progressive Web App (PWA) support for offline play
- Accessibility improvements for screen readers and keyboard navigation

### Visual Enhancements
- More sophisticated card flip animations
- Confetti animation on game completion
- Dark mode support
- Custom card back designs
- Responsive design improvements for various device sizes

## Technologies Used

- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.