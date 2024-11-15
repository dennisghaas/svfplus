<template>
  <LineUpSteps
    v-if="activeStep !== 1"
    :steps="steps"
    :active-step="activeStep"
    :show-prev-link="!welcomeView"
    @change-step="handleChangeStep"
    @welcome-view-click="handleWelcomeViewClick('')"
  />

  <template v-if="activeStep === 0">
    <div v-if="welcomeView" class="row">
      <div class="col-xs-12 col-sm-6 col-lg-6 col-xs-12">
        <SelectCard
          :icon="'icon-lineup-create'"
          :icon-color="'--success-light'"
          :title="'Aufstellung erstellen'"
          :body-text="'Erstelle eine neue Aufstellung für eines, der nächsten <q>drei</q> Spiele'"
          @open-selected-option="handleWelcomeViewClick('create')"
        />
      </div>

      <div class="col-xs-12 col-sm-6 col-lg-6 col-xs-12">
        <SelectCard
          :icon="'icon-lineup-edit'"
          :icon-color="'--primary'"
          :title="'Aufstellung laden'"
          :body-text="'Eine gespeicherte Aufstellung laden und bearbeiten.'"
          @open-selected-option="handleWelcomeViewClick('select')"
        />
      </div>
    </div>

    <div v-else class="row">
      <div v-if="createView" class="col-xs-12 col-xl-6">
        <LineUpCard
          :headline="'Wähle ein Spiel aus'"
          :body-text="'Du kannst aus einem der kommenden Spiele wählen um dir nur die Spieler anzeigen zu lassen, die zu dem Spiel zugesagt oder auf <q>Unsicher</q> reagiert haben.'"
          :games="games"
          :layout-default="false"
          @event-click="handleLoadSelectedEvent"
        />
      </div>
      <div v-else class="col-xs-12">
        <template
          v-if="
            loadedLineUpSelectionNames && loadedLineUpSelectionNames.length > 0
          "
        >
          <LineUpStorageTable
            :storage="loadedLineUpSelectionNames"
            @load-line-up="loadLineUp"
          />
        </template>
        <template v-else>
          <BadgeType
            :badge-text="'Bisher wurden keine Aufstellungen angelegt'"
            :badge-type="'info'"
          />
        </template>
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
import store from '@/store';
import { Event } from '@/interface';
import LineUpSteps from '@/components/LineUpSteps.vue';
import LineUp from '@/components/LineUp.vue';
import LineUpCard from '@/components/LineUpCard.vue';
import SelectCard from '@/components/SelectCard.vue';
import LineUpStorageTable from '@/components/LineUpStorageTable.vue';
import BadgeType from '@/components/BadgeType.vue';

const { loadSelectedEvent } = useLineUp();
const {
  fetchLineUpNames,
  fetchLineUpById,
  loadedLineUpSelectionNames,
  loadedLineUp,
  isExistingLineUp,
} = useLineUpResponses();
const { fetchSingleEventById, selectedSingleEvent } = useEvents();

const games = ref<Event[]>([]);
const welcomeView = ref(true);
const createView = ref(false);
const selectView = ref(false);

const loadLineUp = async (id: number) => {
  await fetchLineUpById(id);
  selectView.value = false;

  await fetchSingleEventById(loadedLineUp.value?.eventId);

  if (selectedSingleEvent.value) {
    isExistingLineUp.value = true;
    handleLoadSelectedEvent(selectedSingleEvent.value);
  } else {
    console.error('selected event is null :/');
  }
};

const handleWelcomeViewClick = (type: string) => {
  if (welcomeView.value) {
    welcomeView.value = false;

    if (type === 'create') {
      createView.value = true;
      fetchGameData();

      /* remove existing line up from app for create */
      if (isExistingLineUp.value) {
        isExistingLineUp.value = false;
      }
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

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
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
