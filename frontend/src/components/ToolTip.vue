<template>
  <div
    v-if="showTooltip"
    class="tooltip"
    :class="additionalClass ? `tooltip--${additionalClass}` : ''"
  >
    <div class="body-text-b4">
      <p v-html="tooltipText" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tooltipText: {
    type: String,
    default: '',
  },
  additionalClass: {
    type: String,
    default: '',
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.tooltip {
  position: absolute;
  background: var(--white);
  box-shadow: $box-shadow-default;
  color: var(--black);
  border-radius: rem(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: $font-weight-500;
  text-align: center;
  padding: rem(5px);
  width: max-content;

  &--graph {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
