<template>
  <div class="w-full max-w-4xl">
    <!-- Game status and controls -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-lg font-semibold">
        <p>Moves: {{ moves }}</p>
        <p>Matches: {{ matches }} / {{ totalPairs }}</p>
      </div>
      <div>
        <button
          @click="startGame"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {{ gameStarted ? "Restart" : "Start Game" }}
        </button>
      </div>
    </div>

    <!-- Game board -->
    <div
      class="grid grid-cols-4 gap-4 md:grid-cols-6"
      :class="{ 'pointer-events-none': !gameStarted }"
    >
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        @flip="flipCard(index)"
      />
    </div>

    <!-- Game over message -->
    <div v-if="gameOver" class="mt-8 text-center">
      <h2 class="text-2xl font-bold text-green-600 mb-2">Congratulations!</h2>
      <p class="text-lg">You completed the game in {{ moves }} moves.</p>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "GameBoard",
  components: {
    Card,
  },
  data() {
    return {
      cards: [],
      flippedCards: [],
      gameStarted: false,
      gameOver: false,
      moves: 0,
      matches: 0,
      totalPairs: 0,
      symbols: [
        "🐶",
        "🐱",
        "🐭",
        "🐹",
        "🐰",
        "🦊",
        "🐻",
        "🐼",
        "🐨",
        "🐯",
        "🦁",
        "🐮",
        "🐷",
        "🐸",
        "🐵",
        "🐔",
        "🐧",
        "🐦",
        "🦆",
        "🦉",
      ],
    };
  },
  methods: {
    startGame() {
      // Reset game state
      this.gameStarted = true;
      this.gameOver = false;
      this.moves = 0;
      this.matches = 0;
      this.flippedCards = [];

      // Create card pairs (using 8 pairs for a 4x4 grid)
      const selectedSymbols = this.symbols.slice(0, 8);
      this.totalPairs = selectedSymbols.length;

      // Create pairs and shuffle
      const cardPairs = [...selectedSymbols, ...selectedSymbols].map(
        (symbol) => ({
          symbol,
          flipped: false,
          matched: false,
        }),
      );

      // Shuffle cards
      this.cards = this.shuffleCards(cardPairs);
    },

    shuffleCards(cards) {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },

    flipCard(index) {
      // Prevent flipping if card is already flipped or matched
      if (this.cards[index].flipped || this.cards[index].matched) {
        return;
      }

      // Prevent flipping more than 2 cards at once
      if (this.flippedCards.length === 2) {
        return;
      }

      // Flip the card
      this.cards[index].flipped = true;
      this.flippedCards.push(index);

      // Check for match if 2 cards are flipped
      if (this.flippedCards.length === 2) {
        this.moves++;
        this.checkForMatch();
      }
    },

    checkForMatch() {
      const [index1, index2] = this.flippedCards;
      const card1 = this.cards[index1];
      const card2 = this.cards[index2];

      if (card1.symbol === card2.symbol) {
        // Match found
        card1.matched = true;
        card2.matched = true;
        this.matches++;
        this.flippedCards = [];

        // Check if game is over
        if (this.matches === this.totalPairs) {
          this.gameOver = true;
        }
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          card1.flipped = false;
          card2.flipped = false;
          this.flippedCards = [];
        }, 1000);
      }
    },
  },
  mounted() {
    // Initialize empty cards
    this.cards = Array(16)
      .fill()
      .map(() => ({
        symbol: "",
        flipped: false,
        matched: false,
      }));
  },
};
</script>
