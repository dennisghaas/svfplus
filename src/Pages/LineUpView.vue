<template>
  <LineUpSteps
    v-if="activeStep !== 1"
    :steps="steps"
    :active-step="activeStep"
    @change-step="handleChangeStep"
  />

  <template v-if="activeStep === 0">
    <ul v-for="(game, index) in games" :key="index">
      <li>
        <button type="button" @click="handleLoadSelectedEvent(game)">
          {{ game.eventDescription.title }}
          {{ game.eventDescription.subtitle }}
          {{ game.id }}
        </button>
      </li>
    </ul>
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
import { Event } from '@/interface';
import LineUpSteps from '@/components/LineUpSteps.vue';
import LineUp from '@/components/LineUp.vue';

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
});
</script>

<style lang="scss" scoped></style>
