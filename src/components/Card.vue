<template>
  <div 
    @click="$emit('flip')" 
    class="aspect-square bg-white rounded-lg shadow-md cursor-pointer transition-transform duration-300 transform"
    :class="{
      'rotate-y-180': card.flipped,
      'bg-green-100': card.matched,
      'hover:scale-105': !card.flipped && !card.matched
    }"
  >
    <div class="h-full w-full flex items-center justify-center">
      <div v-if="card.flipped || card.matched" class="text-4xl">
        {{ card.symbol }}
      </div>
      <div v-else class="h-full w-full bg-blue-500 rounded-lg flex items-center justify-center">
        <span class="text-white text-2xl">?</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
/* Add card flip animation */
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>