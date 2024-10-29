<template>
  <div class="field__sub">
    <div
        v-for="player in players"
        :key="player.id"
        draggable="true"
        @dragstart="handleDragStart($event, player.name)"
        class="player-item"
    >
      {{ player.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  players: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['dragStart', 'removePlayer']);

const handleDragStart = (event: DragEvent, playerName: string) => {
  console.log('Dragging player:', playerName);
  event.dataTransfer?.setData('text/plain', playerName);
  emit('dragStart', playerName);
};
</script>

<style lang="scss" scoped>
.field__sub {
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
}
</style>