<template>
  <!-- Enter View -->
  <div v-if="activeStep === 0" class="lineup__steps">
    <LineUpCard
        v-if="events && events.length > 0"
        :headline="'Wähle ein Spiel aus'"
        :content="'Du kannst aus einem der kommenden Spiele wählen um dir nur die Spieler anzeigen zu lassen, die zu dem ausgewähltem Spiel zugesagt, oder unsicher reagiert haben.'"
        :events="events"
        :show-events="true"
        @use-event-for-line-up="useEventForLineUp"
    />

    <LineUpCard
      :headline="'Aufstellung laden (tbc)'"
      :content="'Falls jemand abgesagt hat oder du noch etwas anpassen musst, lade bereits erstellte und gespeicherte Aufstellungen.'"
    />
  </div>

  <!-- LineUp View -->
  <div v-else-if="activeStep === 1" class="lineup__steps">

    <template v-if="!errorNotEnoughPlayers">
      <LineUpField
          :filtered-user="filteredUser"
          :get-event-responses="responses"
          @prev-step="changeStepToPrev()"
          @next-step="changeStep()"
      />

    </template>

    <template v-else>
      <BadgeType
          :badge-no-icon="true"
          :badge-alt="true"
          :badge-text="`Es haben bislang zu wenig Spieler für dieses Spiel zugesagt. Aktuelle Anzahl <q>${responses.length}</q>`"
          :badge-type="'error'"
      />

      <ButtonType
          :type-button="true"
          :btn-text="'Zurück zur Übersicht'"
          :btn-class="'btn-secondary w-100'"
          @click="changeStepToPrev()"
      />
    </template>
  </div>

  <!-- Safe View -->
  <div v-else class="lineup__steps">
    Safe View

    <i>
      Eigentlich dann Reload durch neue Route wenn speichern erfolgreich
    </i>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useEvents} from "@/composables/useEvents.ts";
import {useEventResponse} from "@/composables/useEventResponse.ts";
import {onMounted} from "vue";

import LineUpField from "@/components/LineUpField.vue";
import ButtonType from "@/components/ButtonType.vue";
import BadgeType from "@/components/BadgeType.vue";
import {EventResponse} from "@/interface";
import {useUser} from "@/composables/useUser.ts";
import LineUpCard from "@/components/LineUpCard.vue";

const {fetchGames, events} = useEvents()
const {fetchAllUsers, completeUserData} = useUser();
const emit = defineEmits(['countUpStep', 'changeStepToPrev'])

const responses = ref<EventResponse[]>([])

defineProps({
  activeStep: {
    type: Number,
    default: 0
  }
})

const changeStep = () => {
  emit('countUpStep')
}

const filteredUser = computed(() => {
  const userIds = responses.value.map(response => response.userId);
  return completeUserData.value.filter(user => userIds.includes(user.id));
});

const errorNotEnoughPlayers = ref(false)

const useEventForLineUp = async (eventID: number) => {
  changeStep();

  const {fetchEventResponse, selectEventResponses} = useEventResponse();
  await fetchEventResponse(eventID, true);
  responses.value = selectEventResponses.value

  /* fetch all users */
  await fetchAllUsers();

  /* throw error if less than 11 players accept or unsure this event */
  errorNotEnoughPlayers.value = selectEventResponses.value.length < 11;
};

const changeStepToPrev = () => {
  emit('changeStepToPrev')
}

onMounted(async () => {
  await fetchGames();
});

</script>

<style lang="scss" scoped>
</style>