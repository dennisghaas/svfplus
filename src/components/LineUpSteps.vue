<template>
  <ul class="line-up-steps blanklist">
    <li
      v-for="step in steps"
      :key="step.index"
      :class="['line-up-step', { 'line-up-step--active': step.active }]"
    >
      <button
        type="button"
        @click="step.index <= activeStep && handleChangeStep(step.index)"
      >
        {{ step.name }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { LineUpStep } from '@/interface';

defineProps({
  activeStep: {
    type: Number,
    default: null,
  },
  steps: {
    type: Array as () => LineUpStep[],
    default: () => [] as LineUpStep[],
  },
});

const emit = defineEmits<{
  (event: 'change-step', index: number): void;
}>();

const handleChangeStep = (index: number) => {
  emit('change-step', index);
};
</script>

<style scoped lang="scss">
.line-up-step {
  &--active {
    background: yellow;
  }
}
</style>
