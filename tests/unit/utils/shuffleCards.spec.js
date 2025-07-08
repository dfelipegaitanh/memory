/**
 * @jest-environment node
 */

// Extract the shuffleCards function from GameBoard.vue for testing
function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

describe("shuffleCards utility function", () => {
  it("returns an array of the same length", () => {
    const cards = [
      { symbol: "🐶", flipped: false, matched: false },
      { symbol: "🐱", flipped: false, matched: false },
      { symbol: "🐭", flipped: false, matched: false },
      { symbol: "🐹", flipped: false, matched: false },
    ];

    const shuffled = shuffleCards(cards);

    expect(shuffled.length).toBe(cards.length);
  });

  it("contains all the original cards", () => {
    const cards = [
      { symbol: "🐶", flipped: false, matched: false },
      { symbol: "🐱", flipped: false, matched: false },
      { symbol: "🐭", flipped: false, matched: false },
      { symbol: "🐹", flipped: false, matched: false },
    ];

    const shuffled = shuffleCards(cards);

    // Check that all original cards are in the shuffled array
    cards.forEach((card) => {
      expect(shuffled.some((c) => c.symbol === card.symbol)).toBe(true);
    });
  });

  it("does not modify the original array", () => {
    const cards = [
      { symbol: "🐶", flipped: false, matched: false },
      { symbol: "🐱", flipped: false, matched: false },
      { symbol: "🐭", flipped: false, matched: false },
      { symbol: "🐹", flipped: false, matched: false },
    ];

    const originalCards = [...cards];

    shuffleCards(cards);

    // Check that the original array is unchanged
    expect(cards).toEqual(originalCards);
  });

  it("shuffles the cards in a different order", () => {
    // Mock Math.random to return predictable values
    const originalRandom = Math.random;
    Math.random = jest
      .fn()
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9);

    const cards = [
      { symbol: "🐶", flipped: false, matched: false },
      { symbol: "🐱", flipped: false, matched: false },
      { symbol: "🐭", flipped: false, matched: false },
      { symbol: "🐹", flipped: false, matched: false },
    ];

    const shuffled = shuffleCards(cards);

    // Check that the order is different
    expect(shuffled).not.toEqual(cards);

    // Restore the original Math.random
    Math.random = originalRandom;
  });
});
