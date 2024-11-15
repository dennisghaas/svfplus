<template>
  <div v-if="isExistingLineUp" class="row">
    <div class="col-xs-12 col-sm-6">
      <LineUpCard
        :headline="'Bearbeiten'"
        :body-text="'Aktualisiere die ausgewählte Aufstellung.'"
      >
        <template #layoutDefaultContent>
          <ButtonType
            :type-button="true"
            :btn-class="'w-100'"
            :btn-text="'Aufstellung aktualisieren'"
            @click="editLineUpById(loadedLineUp?.id ?? null)"
          />
        </template>
      </LineUpCard>
    </div>

    <div class="col-xs-12 col-sm-6">
      <LineUpCard
        :headline="'Als neue Aufstellung speichern'"
        :body-text="'Speicher die aktuelle Aufstellung als Neue.'"
      >
        <template #layoutDefaultContent>
          <ButtonType
            :type-button="true"
            :btn-class="'btn-secondary w-100'"
            :btn-text="'Aufstellung speichern'"
            @click="saveFormation"
          />
        </template>
      </LineUpCard>
    </div>
  </div>

  <template v-else>
    <div class="col-xs-12 col-sm-6 col-lg-12 col-xl-6">
      <LineUpCard
        :headline="'Aufstellung speichern'"
        :body-text="'Speichere deine Aufstellung auf dem Server um später darauf zugreifen zu können.'"
      >
        <template #layoutDefaultContent>
          <ButtonType
            :type-button="true"
            :btn-class="'w-100'"
            :btn-text="'Aufstellung speichern'"
            @click="saveFormation"
          />
        </template>
      </LineUpCard>
    </div>
  </template>

  <ButtonWrapper>
    <template #buttons>
      <ButtonType
        :btn-text="'Zurück zur Aufstellung'"
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
import LineUpCard from '@/components/LineUpCard.vue';

const { saveFormation, editLineUpById, isExistingLineUp, loadedLineUp } =
  useLineUpResponses();
const emit = defineEmits(['prev-step', 'next-step']);

// editLineUpById()

const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);
  }
};
</script>

<style scoped lang="scss"></style>
