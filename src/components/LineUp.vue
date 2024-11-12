<template>
  <template v-if="activeStep === 1">
    <LineUpField
      v-if="!errorNotEnoughPlayers"
      @next-step="handleClickStepHandling"
      @prev-step="handleClickStepHandling"
    />
    <LineUpFieldError v-else @prev-step="handleClickStepHandling('prev')" />
  </template>
  <template v-else>
    <LineUpClosure @prev-step="handleClickStepHandling" />
  </template>
</template>

<script setup lang="ts">
import { useLineUp } from '@/composables/useLineUp.ts';
import LineUpField from '@/components/LineUpField.vue';
import LineUpClosure from '@/components/LineUpClosure.vue';
import LineUpFieldError from '@/components/LineUpFieldError.vue';

const { errorNotEnoughPlayers } = useLineUp();

const emit = defineEmits(['prev-step', 'next-step']);

const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);
  } else {
    emit('next-step', type);
  }
};

defineProps({
  activeStep: {
    type: Number,
    default: null,
  },
});
</script>

<style scoped lang="scss"></style>
