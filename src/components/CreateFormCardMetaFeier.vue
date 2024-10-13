<template>
  <InputType
    :id="'party-date'"
    :label="'Datum'"
    :input-type="'date'"
    v-model:modelValue="eventDate"
  />

  <InputType
    :id="'venue-street'"
    :label="'Straße'"
    :input-type="'text'"
    :input-placeholder="'Straße der Veranstaltung'"
    v-model:modelValue="venueStreet"
    :error-message="venueStreetError ? 'Das ist ein Pflichtfeld' : ''"
  />

  <InputType
    :id="'venue-postal-code'"
    :label="'PLZ'"
    :input-type="'text'"
    :input-placeholder="'Postleitzahl der Veranstaltung'"
    v-model:modelValue="venuePostalCode"
    :error-message="venuePostalCodeError ? 'Das ist ein Pflichtfeld' : ''"
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
</template>

<script setup lang="ts">
import { useEvents } from '@/composables/useEvents.ts'
import InputType from '@/components/InputType.vue'
import CheckboxType from '@/components/CheckboxType.vue'
import BadgeType from '@/components/BadgeType.vue'

const { eventDate, venueStreet, venuePostalCode, showInDashboard } = useEvents()

/* CHECKBOX: SHOW EVENT IN USERS DASHBOARD */
const updateShowInDashboard = (showDashboard: boolean) => {
  showInDashboard.value = showDashboard
}

defineProps({
  venueStreetError: {
    type: Boolean,
    default: false,
  },
  venuePostalCodeError: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss"></style>
