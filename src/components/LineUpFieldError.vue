<template>
  <div class="row">
    <div class="col-xs-12 col-xl-6">
      <LineUpCard>
        <template #layoutDefaultContent>
          <div class="lineup__error">
            <h2>🙇‍♂️ Ooops!</h2>

            <div class="body-text-b2">
              <p>
                Es sind leider nicht genügend Spieler für dieses Event
                verfügbar. Die Anzahl muss >= 11 sein, damit Daten ausgegeben
                werden können.
              </p>
              <p>Gehe <q>Zurück</q> und wähle ein anderes Spiel aus!</p>
            </div>

            <ButtonWrapper>
              <template #buttons>
                <ButtonType
                  :btn-class="'w-100'"
                  :btn-text="'Zurück'"
                  :type-button="true"
                  @click="handlePrevStep"
                />
              </template>
            </ButtonWrapper>
          </div>
        </template>
      </LineUpCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonType from '@/components/ButtonType.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import LineUpCard from '@/components/LineUpCard.vue';

const emits = defineEmits(['prev-step']);

const handlePrevStep = () => {
  /* clean console */
  console.clear();

  /* emit click */
  emits('prev-step');
};
</script>

<style scoped lang="scss">
.lineup__error {
  h2,
  .h2 {
    margin-bottom: rem(10px);
  }

  .button-wrapper {
    margin-top: rem(20px);
  }
}
</style>
