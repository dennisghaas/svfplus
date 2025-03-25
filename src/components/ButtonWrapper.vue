<template>
  <div :class="['button-wrapper', { 'button-wrapper--as-row': alignAsRow }]">
    <slot name="buttons"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  alignAsRow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--as-row {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
