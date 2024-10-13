<template>
  <InputType
    :id="'event-date'"
    :label="'Datum'"
    :input-type="'date'"
    v-model:modelValue="eventDate"
  />

  <RadioType
    :name="'venue'"
    :radio="venueOptions"
    :static-data-radio="true"
    @update:model-value="updateVenue"
  />

  <InputType
    :id="'venue-street'"
    :label="'Straße (optional)'"
    :input-type="'text'"
    :input-placeholder="'Straße'"
    v-model:modelValue="venueStreet"
    :error-message="
      venueStreetError
        ? '(1) Der Straßenname ist nicht valide.<br>(2) Falls du eine PLZ eingetragen hast, brauchen wir ebenfalls die Straße. So können wir garantieren, dass die Adresse gefunden wird.'
        : ''
    "
  />

  <InputType
    :id="'venue-postal-code'"
    :label="'PLZ (optional)'"
    :input-type="'text'"
    :input-placeholder="'Postleitzahl + Stadt'"
    v-model:modelValue="venuePostalCode"
    :error-message="
      venuePostalCodeError
        ? '(1) Die Postleitzahl ist nicht valide. (PLZ + Stadt)<br>(2) Falls du eine Straße eingetragen hast, brauchen wir ebenfalls die Postleitzahl. So können wir garantieren, dass die Adresse gefunden wird.'
        : ''
    "
  />

  <CheckboxType
    :label="'Im Dahsboard der Spieler anzeigen'"
    :id="'checkbox-for-dashboard'"
    :value="showInDashboard"
    @update:model-value="updateShowInDashboard"
  />

  <BadgeType
    v-if="showInDashboard"
    :badge-type="'info'"
    :badge-text="'Das Event wird solange im Dashboard angezeigt, bis der Spieler darauf reagiert hat.'"
  />

  <InputType
    :id="'link-extern'"
    :label="'Link fussball.de (optional)'"
    :input-type="'text'"
    :input-placeholder="'Link'"
    v-model:modelValue="linkExtern"
    :error-message="
      linkExternError
        ? 'Der Link ist nicht valide. Bitte nutze eine URL von Fussball.de.'
        : ''
    "
  />

  <SelectTypeUser
    :select-title="'Spieler nicht nominieren'"
    :select-placeholder="'Spieler auswählen'"
    :selected-users="selectedUsers"
    @update:selection="updatePlayerWithNoAccess"
  />
</template>

<script setup lang="ts">
import { useEvents } from '@/composables/useEvents.ts';
import { venueOptions } from '@/config.ts';
import InputType from '@/components/InputType.vue';
import SelectTypeUser from '@/components/SelectTypeUser.vue';
import RadioType from '@/components/RadioType.vue';
import CheckboxType from '@/components/CheckboxType.vue';
import BadgeType from '@/components/BadgeType.vue';
import { ref } from 'vue';

/* CHECKBOX: UPDATE VENUE HOME OR AWAY GAME */
const updateVenue = (selectedVenue: string | number) => {
  // Ensure selectedVenue is treated as a string
  if (typeof selectedVenue === 'string') {
    venue.value = selectedVenue;

    if (venue.value === 'Heimspiel') {
      venueStreet.value = 'Lawaetzstraße 8';
      venuePostalCode.value = '22844 Norderstedt';
    } else {
      venueStreet.value = '';
      venuePostalCode.value = '';
    }
  }
};

/* CHECKBOX: SHOW EVENT IN USERS DASHBOARD */
const updateShowInDashboard = (showDashboard: boolean) => {
  showInDashboard.value = showDashboard;
};

/* SELECT: PLAYER WITH NO ACCESS TO EVENT */
const updatePlayerWithNoAccess = (noAccess: string[]) => {
  playerWithNoAccess.value = noAccess;
};

const selectedUsers = ref<string[]>([]);

defineProps({
  venueStreetError: {
    type: Boolean,
    default: false,
  },
  venuePostalCodeError: {
    type: Boolean,
    default: false,
  },
  linkExternError: {
    type: Boolean,
    default: false,
  },
});

const {
  eventDate,
  venue,
  venueStreet,
  venuePostalCode,
  showInDashboard,
  linkExtern,
  playerWithNoAccess,
} = useEvents();
</script>

<style scoped lang="scss"></style>
