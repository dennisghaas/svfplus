<template>
  <mark>Closure</mark>
  <button type="button" @click="handleClickStepHandling('prev')">Zurück</button>
</template>

<script setup lang="ts">
const emit = defineEmits(['prev-step', 'next-step']);

const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);
  }
};
</script>

<style scoped lang="scss"></style>
