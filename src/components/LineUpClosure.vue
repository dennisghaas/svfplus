<template>
  <h2>Abschluss</h2>
  <ButtonWrapper>
    <template #buttons>
      <ButtonType
        :btn-text="'Zurück'"
        :btn-class="'w-100 btn-secondary'"
        :type-button="true"
        @click="handleClickStepHandling('prev')"
      />
    </template>
  </ButtonWrapper>
</template>

<script setup lang="ts">
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import ButtonType from '@/components/ButtonType.vue';

const emit = defineEmits(['prev-step', 'next-step']);

const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);
  }
};
</script>

<style scoped lang="scss"></style>
