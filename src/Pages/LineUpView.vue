<template>
  <LineUpSteps
    v-if="(activeStep !== 1 && isMobile) || isTablet"
    :steps="steps"
    :active-step="activeStep"
    @change-step="handleChangeStep"
  />

  <template v-if="activeStep === 0">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-lg-12 col-xl-6">
        <LineUpCard
          :headline="'Wähle ein Spiel aus'"
          :body-text="'Du kannst aus einem der kommenden Spiele wählen um dir nur die Spieler anzeigen zu lassen, die zu dem Spiel zugesagt haben.'"
          :games="games"
          :layout-default="false"
          @event-click="handleLoadSelectedEvent"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-12 col-xl-6">
        <LineUpCard :headline="'Erstellte Aufstellung laden'" :body-text="''">
          <template #layoutDefaultContent>
            <SelectType :select-placeholder="'Meine_Aufstellung_2132 (tbc)'" />
            <ButtonType
              :btn-class="'w-100'"
              :btn-text="'Aufstellung anzeigen'"
              :type-button="true"
            />
          </template>
        </LineUpCard>
      </div>
    </div>
  </template>

  <LineUp
    v-else
    :active-step="activeStep"
    @prev-step="handleClickStepHandling"
    @next-step="handleClickStepHandling"
  />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useLineUp } from '@/composables/useLineUp.ts';
import { useEvents } from '@/composables/useEvents.ts';
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import store from '@/store';
import { Event } from '@/interface';
import LineUpSteps from '@/components/LineUpSteps.vue';
import LineUp from '@/components/LineUp.vue';
import LineUpCard from '@/components/LineUpCard.vue';
import SelectType from '@/components/SelectType.vue';
import ButtonType from '@/components/ButtonType.vue';

const { isMobile, isTablet } = useBreakpoint();
const { loadSelectedEvent } = useLineUp();
const games = ref<Event[]>([]);

const activeStep = ref(0);
const steps = reactive([
  {
    index: 0,
    name: 'Schritt 1',
    active: true,
  },
  {
    index: 1,
    name: 'Schritt 2',
    active: false,
  },
  {
    index: 2,
    name: 'Schritt 3',
    active: false,
  },
]);

const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    if (activeStep.value >= 1) {
      activeStep.value--;
    }
  } else {
    if (activeStep.value <= 1) {
      activeStep.value++;
    }
  }

  steps.forEach((step) => {
    step.active = step.index === activeStep.value;
  });
};

const handleChangeStep = (index: number) => {
  activeStep.value = index;

  steps.forEach((step) => {
    step.active = step.index === index;
  });
};

const handleLoadSelectedEvent = (game: Event) => {
  /* move to next step */
  handleClickStepHandling('next');

  /* load data from composable */
  loadSelectedEvent(game);
};

onMounted(async () => {
  const { fetchGames, events } = useEvents();
  await fetchGames();
  games.value = events.value;

  store.pageHeadline('Aufstellung erstellen');
});
</script>

<style lang="scss" scoped></style>
