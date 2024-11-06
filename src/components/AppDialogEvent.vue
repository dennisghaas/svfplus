<template>
  <div class="app-dialog--event" v-if="!isLoading">
    <AppDialogEventTraining
      v-if="eventType === 'Training'"
      :event-i-d="eventID"
      :event-type="eventType"
      :date="`${formatEventDates.eventDate?.year}-${formatEventDates.eventDate?.month}-${formatEventDates.eventDate?.day}`"
    />
    <AppDialogEventSpielFeier
      v-if="eventType === 'Spiel' || eventType === 'Feier'"
      :event-type="eventType"
      :event-i-d="eventID"
      :date="`${formatEventDates.eventDate?.year}-${formatEventDates.eventDate?.month}-${formatEventDates.eventDate?.day}`"
    />
    <AppDialogEventAbstimmung v-if="eventType === 'Abstimmung'" />

    <MetaInformation
      :author="selectedEvent[0].author"
      :created-at="`${formatEventDates.createdAt?.day}.${formatEventDates.createdAt?.month}.${formatEventDates.createdAt?.year}`"
      :updated-at="`${formatEventDates.updatedAt?.day}.${formatEventDates.updatedAt?.month}.${formatEventDates.updatedAt?.year}`"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useEvents } from '@/composables/useEvents.ts';
import { formatDate } from '@/helpers/formatDate.ts';
import AppDialogEventTraining from '@/components/AppDialogEventTraining.vue';
import AppDialogEventAbstimmung from '@/components/AppDialogEventAbstimmung.vue';
import AppDialogEventSpielFeier from '@/components/AppDialogEventSpielFeier.vue';
import MetaInformation from '@/components/MetaInformation.vue';

// Define props
const props = defineProps({
  eventID: {
    type: Number,
    default: null,
  },
  eventType: {
    type: String,
    default: '',
  },
});

const { fetchEventsByID, selectedEvent } = useEvents();
const isLoading = ref(true);
const event = ref(selectedEvent.value[0]);

const formatEventDates = computed(() => ({
  eventDate: formatDate(event.value.eventDate),
  createdAt: formatDate(event.value.createdAt),
  updatedAt: formatDate(event.value.updatedAt),
}));

onMounted(async () => {
  try {
    await fetchEventsByID(props.eventID);
  } catch (error) {
    console.error('Error fetching event:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="scss"></style>
