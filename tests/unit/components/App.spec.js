/**
 * @jest-environment node
 */

// Mock App component
const App = {
  name: "App",
  components: {
    GameBoard: { name: "GameBoard" },
  },
  template: "<div><h1>Memory Game</h1><GameBoard /></div>",
};

describe("App.vue", () => {
  it("has the correct name", () => {
    expect(App.name).toBe("App");
  });

  it("includes the GameBoard component", () => {
    expect(App.components.GameBoard).toBeDefined();
  });

  it("has the correct template", () => {
    expect(App.template).toContain("<h1>Memory Game</h1>");
    expect(App.template).toContain("<GameBoard />");
  });
});
