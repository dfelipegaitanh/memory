<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4"
  >
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Memory Game
    </h1>
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";

export default {
  name: "App",
  components: {
    GameBoard,
  },
};
</script>
