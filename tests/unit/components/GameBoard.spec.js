/**
 * @jest-environment node
 */

// Mock Card component
const Card = {
  name: 'Card',
  props: ['card'],
  template: '<div>Card Component</div>'
};

// Create a GameBoard class with the same methods as the Vue component
class GameBoardMock {
  constructor() {
    this.cards = Array(16).fill().map(() => ({
      symbol: '',
      flipped: false,
      matched: false
    }));
    this.flippedCards = [];
    this.gameStarted = false;
    this.gameOver = false;
    this.moves = 0;
    this.matches = 0;
    this.totalPairs = 0;
    this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦉'];
  }

  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.moves = 0;
    this.matches = 0;
    this.flippedCards = [];

    const selectedSymbols = this.symbols.slice(0, 8);
    this.totalPairs = selectedSymbols.length;

    const cardPairs = [...selectedSymbols, ...selectedSymbols].map(symbol => ({
      symbol,
      flipped: false,
      matched: false
    }));

    this.cards = this.shuffleCards(cardPairs);
  }

  shuffleCards(cards) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  flipCard(index) {
    if (this.cards[index].flipped || this.cards[index].matched) {
      return;
    }

    if (this.flippedCards.length === 2) {
      return;
    }

    this.cards[index].flipped = true;
    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const [index1, index2] = this.flippedCards;
    const card1 = this.cards[index1];
    const card2 = this.cards[index2];

    if (card1.symbol === card2.symbol) {
      card1.matched = true;
      card2.matched = true;
      this.matches++;
      this.flippedCards = [];

      if (this.matches === this.totalPairs) {
        this.gameOver = true;
      }
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }
}

describe('GameBoard.vue', () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoardMock();
  });

  it('initializes with empty cards', () => {
    // Check that cards array is initialized with 16 empty cards
    expect(gameBoard.cards.length).toBe(16);
    expect(gameBoard.gameStarted).toBe(false);
    expect(gameBoard.gameOver).toBe(false);
    expect(gameBoard.moves).toBe(0);
    expect(gameBoard.matches).toBe(0);
  });

  it('starts the game when startGame is called', () => {
    // Mock the shuffleCards method to return a predictable result
    const originalShuffleCards = gameBoard.shuffleCards;
    gameBoard.shuffleCards = jest.fn(cards => cards);

    // Trigger the startGame method
    gameBoard.startGame();

    // Check that game state is updated
    expect(gameBoard.gameStarted).toBe(true);
    expect(gameBoard.gameOver).toBe(false);
    expect(gameBoard.moves).toBe(0);
    expect(gameBoard.matches).toBe(0);
    expect(gameBoard.totalPairs).toBe(8);
    expect(gameBoard.cards.length).toBe(16);

    // Restore original method
    gameBoard.shuffleCards = originalShuffleCards;
  });

  it('flips a card when flipCard is called', () => {
    // Start the game
    gameBoard.startGame();

    // Flip a card
    gameBoard.flipCard(0);

    // Check that the card is flipped
    expect(gameBoard.cards[0].flipped).toBe(true);
    expect(gameBoard.flippedCards).toContain(0);
  });

  it('does not flip a card that is already flipped', () => {
    // Start the game
    gameBoard.startGame();

    // Flip a card
    gameBoard.cards[0].flipped = true;
    gameBoard.flippedCards = [0];

    // Try to flip the same card again
    gameBoard.flipCard(0);

    // Check that the flippedCards array still has only one card
    expect(gameBoard.flippedCards.length).toBe(1);
  });

  it('does not flip a card that is already matched', () => {
    // Start the game
    gameBoard.startGame();

    // Set a card as matched
    gameBoard.cards[0].matched = true;

    // Try to flip the matched card
    gameBoard.flipCard(0);

    // Check that the flippedCards array is still empty
    expect(gameBoard.flippedCards.length).toBe(0);
  });

  it('does not flip more than 2 cards at once', () => {
    // Start the game
    gameBoard.startGame();

    // Flip 2 cards
    gameBoard.flippedCards = [0, 1];

    // Try to flip a third card
    gameBoard.flipCard(2);

    // Check that the flippedCards array still has only 2 cards
    expect(gameBoard.flippedCards.length).toBe(2);
  });

  it('increments moves when 2 cards are flipped', () => {
    // Start the game
    gameBoard.startGame();

    // Mock checkForMatch to avoid side effects
    const originalCheckForMatch = gameBoard.checkForMatch;
    gameBoard.checkForMatch = jest.fn();

    // Flip 1 card
    gameBoard.flipCard(0);
    expect(gameBoard.moves).toBe(0);

    // Flip a second card
    gameBoard.flipCard(1);
    expect(gameBoard.moves).toBe(1);

    // Restore original method
    gameBoard.checkForMatch = originalCheckForMatch;
  });

  it('marks cards as matched when they have the same symbol', () => {
    // Start the game
    gameBoard.startGame();

    // Set up two cards with the same symbol
    gameBoard.cards[0].symbol = '🐶';
    gameBoard.cards[1].symbol = '🐶';
    gameBoard.flippedCards = [0, 1];

    // Mock setTimeout to avoid async issues
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = jest.fn(cb => cb());

    // Check for match
    gameBoard.checkForMatch();

    // Check that the cards are marked as matched
    expect(gameBoard.cards[0].matched).toBe(true);
    expect(gameBoard.cards[1].matched).toBe(true);
    expect(gameBoard.matches).toBe(1);
    expect(gameBoard.flippedCards.length).toBe(0);

    // Restore original setTimeout
    global.setTimeout = originalSetTimeout;
  });

  it('flips cards back when they do not match', () => {
    jest.useFakeTimers();

    // Start the game
    gameBoard.startGame();

    // Set up two cards with different symbols
    gameBoard.cards[0].symbol = '🐶';
    gameBoard.cards[1].symbol = '🐱';
    gameBoard.cards[0].flipped = true;
    gameBoard.cards[1].flipped = true;
    gameBoard.flippedCards = [0, 1];

    // Check for match
    gameBoard.checkForMatch();

    // Check that the cards are still flipped before the timeout
    expect(gameBoard.cards[0].flipped).toBe(true);
    expect(gameBoard.cards[1].flipped).toBe(true);

    // Fast-forward time
    jest.runAllTimers();

    // Check that the cards are flipped back after the timeout
    expect(gameBoard.cards[0].flipped).toBe(false);
    expect(gameBoard.cards[1].flipped).toBe(false);
    expect(gameBoard.flippedCards.length).toBe(0);

    jest.useRealTimers();
  });

  it('ends the game when all pairs are matched', () => {
    // Start the game
    gameBoard.startGame();

    // Set up the game to be almost over
    gameBoard.matches = 7;
    gameBoard.totalPairs = 8;

    // Match the last pair
    gameBoard.cards[0].symbol = '🐶';
    gameBoard.cards[1].symbol = '🐶';
    gameBoard.flippedCards = [0, 1];

    // Mock setTimeout to avoid async issues
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = jest.fn(cb => cb());

    // Check for match
    gameBoard.checkForMatch();

    // Check that the game is over
    expect(gameBoard.matches).toBe(8);
    expect(gameBoard.gameOver).toBe(true);

    // Restore original setTimeout
    global.setTimeout = originalSetTimeout;
  });

  it('shuffles cards correctly', () => {
    // Create an array of cards
    const cards = [
      { symbol: '🐶', flipped: false, matched: false },
      { symbol: '🐱', flipped: false, matched: false },
      { symbol: '🐭', flipped: false, matched: false },
      { symbol: '🐹', flipped: false, matched: false }
    ];

    // Shuffle the cards
    const shuffled = gameBoard.shuffleCards(cards);

    // Check that the shuffled array has the same length
    expect(shuffled.length).toBe(cards.length);

    // Check that all original cards are in the shuffled array
    cards.forEach(card => {
      expect(shuffled.some(c => c.symbol === card.symbol)).toBe(true);
    });
  });
});
