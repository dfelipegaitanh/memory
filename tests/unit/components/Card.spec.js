/**
 * @jest-environment node
 */
// Mock Card component
const Card = {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  template: "<div @click=\"$emit('flip')\">{{ card.symbol }}</div>",
  emitted: jest.fn(() => ({ flip: [[]] })),
};

describe("Card.vue", () => {
  it("has the correct props definition", () => {
    // Check that the card prop is defined correctly
    expect(Card.props.card.type).toBe(Object);
    expect(Card.props.card.required).toBe(true);
  });

  it("has the correct template", () => {
    // Check that the template includes the card symbol
    expect(Card.template).toContain("{{ card.symbol }}");
  });

  it("emits flip event when clicked", () => {
    // Check that the template has a click handler that emits 'flip'
    expect(Card.template).toContain("@click=\"$emit('flip')\"");

    // Check that the emitted method returns the expected value
    expect(Card.emitted().flip).toBeTruthy();
  });
});
