<template>
  <!-- Enter View -->
  <div v-if="activeStep === 0" class="lineup__steps">
    <div v-if="events && events.length > 0" class="lineup__card">
      <h3>
        Wähle ein Spiel aus
      </h3>
      <div class="body-text-b2">
        <p>
          Du kannst aus einem der kommenden Spiele wählen um dir nur die Spieler anzeigen zu lassen, die zu dem
          ausgewähltem Spiel zugesagt haben.
        </p>
      </div>

      <div v-for="game in events" class="lineup__card__game-quick-link">
        <div class="lineup__card__game-quick-link-content">
          <h4>
            {{ game.venue }}
          </h4>
          <div class="body-text-b3 text-color-white-75">
            <p>
              {{ game.eventDescription.subtitle }}
            </p>
          </div>
        </div>
        <button class="lineup__card__game-quick-link-button" type="button" @click="useEventForLineUp(game.id)">
          <i class="icon-chevron-right"></i>
          <span class="d-none">
          Öffne irgendwas
        </span>
        </button>
      </div>
    </div>
    <div class="lineup__card">
      <h3>
        Aufstellung laden (tbc)
      </h3>

      <div class="body-text-b2">
        <p>
          Falls jemand abgesagt hat oder du noch etwas anpassen musst, lade bereits erstellte und gespeicherte
          Aufstellungen.
        </p>
      </div>

      <SelectType/>
      <ButtonType
          :btn-class="'w-100'"
          :btn-text="'Aufstellung anzeigen'"
          :type-button="true"
      />
    </div>
  </div>

  <!-- LineUp View -->
  <div v-else-if="activeStep === 1" class="lineup__steps">

    <template v-if="!errorNotEnoughPlayers">
      <LineUpField
          :filtered-user="filteredUser"
          :get-event-responses="responses"
      />

      <ButtonWrapper>
        <template #buttons>
          <ButtonType
              :btn-class="'btn-secondary w-100'"
              :btn-text="'Zurück'"
              :type-button="true"
              @click="changeStepToPrev()"
          />

          <ButtonType
              :btn-class="'w-100'"
              :btn-text="'Weiter'"
              :type-button="true"
              @click="changeStep()"
          />
        </template>
      </ButtonWrapper>

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
import SelectType from "@/components/SelectType.vue";
import ButtonType from "@/components/ButtonType.vue";
import BadgeType from "@/components/BadgeType.vue";
import {EventResponse} from "@/interface";
import {useUser} from "@/composables/useUser.ts";
import ButtonWrapper from "@/components/ButtonWrapper.vue";

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
.lineup__card {
  background: var(--white);
  padding: rem(20px);
  border-radius: rem(10px);
  margin-bottom: rem(20px);

  [class*="body-text-"] {
    margin-bottom: 1rem;
  }

  &__game-quick-link {
    position: relative;
    padding: rem(10px) rem(20px);
    color: var(--white);
    background: var(--blue-soft-gray);
    border-radius: rem(10px);
    margin-top: 1rem;

    [class*="body-text-"] {
      margin-bottom: 0;
    }

    &-button {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: rem(20px);
    }
  }
}
</style>