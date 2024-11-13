<template>
  <h2>Aufstellung speichern</h2>

  <button type="button" @click="saveFormation">Test Api connection</button>

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
import { useLineUpResponses } from '@/composables/useLineUpResponses.ts';
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import ButtonType from '@/components/ButtonType.vue';

const { saveFormation } = useLineUpResponses();
const emit = defineEmits(['prev-step', 'next-step']);

const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);
  }
};
</script>

<style scoped lang="scss"></style>
