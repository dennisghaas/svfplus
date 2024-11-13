<template>
  <LineUpSteps
    v-if="activeStep !== 1 && !isDesktop"
    :steps="steps"
    :active-step="activeStep"
    @change-step="handleChangeStep"
  />

  <template v-if="activeStep === 0">
    <div v-if="welcomeView" class="row">
      <div class="col-xs-12 col-sm-6 col-lg-6 col-xs-12">
        <SelectCard
          :title="'Aufstellung erstellen'"
          :body-text="'Erstelle eine neue Aufstellung für eines, der nächsten <q>drei</q> Spiele'"
          @open-selected-option="handleWelcomeViewClick('create')"
        />
      </div>

      <div class="col-xs-12 col-sm-6 col-lg-6 col-xs-12">
        <SelectCard
          :title="'Aufstellung laden'"
          :body-text="'Du kannst vorher erstellte Aufstellungen laden und anschließend bearbeiten.'"
          @open-selected-option="handleWelcomeViewClick('select')"
        />
      </div>
    </div>

    <div v-else class="row">
      <div class="col-xs-12">
        <LinkType
          :btn-class="'btn-prev w-100'"
          :btn-text="'Zurück zur Auswahl'"
          :btn-icon-prev="true"
          :btn-icon="'icon-chevron-left'"
          @click="handleWelcomeViewClick('')"
        />
      </div>
      <div v-if="createView" class="col-xs-12 col-sm-6 col-lg-12 col-xl-6">
        <LineUpCard
          :headline="'Wähle ein Spiel aus'"
          :body-text="'Du kannst aus einem der kommenden Spiele wählen um dir nur die Spieler anzeigen zu lassen, die zu dem Spiel zugesagt haben.'"
          :games="games"
          :layout-default="false"
          @event-click="handleLoadSelectedEvent"
        />
      </div>
      <div v-else class="col-xs-12">
        <LineUpStorageTable
          :storage="loadedLineUpSelectionNames"
          @load-formation="test"
        />
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
import { useLineUpResponses } from '@/composables/useLineUpResponses.ts';
import { useEvents } from '@/composables/useEvents.ts';
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import store from '@/store';
import { Event } from '@/interface';
import LineUpSteps from '@/components/LineUpSteps.vue';
import LineUp from '@/components/LineUp.vue';
import LineUpCard from '@/components/LineUpCard.vue';
import SelectCard from '@/components/SelectCard.vue';
import LinkType from '@/components/LinkType.vue';
import LineUpStorageTable from '@/components/LineUpStorageTable.vue';

const { isDesktop } = useBreakpoint();
const { loadSelectedEvent } = useLineUp();
const { fetchLineUpNames, loadedLineUpSelectionNames } = useLineUpResponses();
const games = ref<Event[]>([]);
const welcomeView = ref(true);
const createView = ref(false);
const selectView = ref(false);

const test = (id: number) => {
  console.log('id aus tabelle', id);
};

const handleWelcomeViewClick = (type: string) => {
  if (welcomeView.value) {
    welcomeView.value = false;

    if (type === 'create') {
      createView.value = true;
      fetchGameData();
    } else {
      selectView.value = true;

      fetchLineUpNames();
    }
  } else {
    welcomeView.value = true;
    createView.value = false;
    selectView.value = false;

    console.clear();
  }
};

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

const fetchGameData = async () => {
  const { fetchGames, events } = useEvents();
  await fetchGames();
  games.value = events.value;
};

onMounted(() => {
  store.pageHeadline('SVF Plus - LineUp');
});
</script>

<style lang="scss" scoped></style>
