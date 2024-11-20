<template>
  <div class="row">
    <div
      v-for="event in upcomingEvents"
      :key="event.id"
      class="col-xs-12 col-sm-6 col-xl-4"
    >
      <CardEvent
        :id="event.id"
        :event-type="event.eventType"
        :title="event.eventDescription.title"
        :subtitle="event.eventDescription.subtitle"
        :event-date="event.eventDate ?? ''"
        :meet-at="event.eventDescription.meetAt ?? ''"
        :begin-at="event.eventDescription.beginAt ?? ''"
        :end-at="event.eventDescription.endAt ?? ''"
        :description="event.eventDescription.description"
        :time-to-react="event.eventDescription.deadlineToStart ?? ''"
        :player-with-no-access="event.playerWithNoAccess"
        :standing-order-i-d="event.standingOrderID"
        :venue="event.venue"
        :venue-street="event.venueStreet"
        :venue-postal-code="event.venuePostalCode"
        :link-extern="event.linkExtern"
        :vote-question="event.voteQuestion"
        :vote-options="event.voteOptions"
        :vote-multiple-selection="event.voteMultipleSelection"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useEvents } from '@/composables/useEvents.ts';
import CardEvent from '@/components/CardEvent.vue';

// Fetch events from composable
const { fetchEvents, events } = useEvents();

// Filter the first 3 upcoming events
const upcomingEvents = computed(() => {
  const now = new Date(); // Aktuelles Datum und Zeit

  return events.value
    .filter((event) => {
      // Check if eventDate is null or invalid
      if (!event.eventDate) return false; // Exclude events without a valid date

      const eventDate = new Date(event.eventDate);
      return !isNaN(eventDate.getTime()) && eventDate >= now; // Event bleibt, bis es beginnt
    })
    .sort((a, b) => {
      // Use a null check before creating a Date object
      const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0; // Default to 0 if eventDate is null
      const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0; // Default to 0 if eventDate is null
      return dateA - dateB;
    })
    .slice(0, 3);
});

onMounted(async () => {
  await fetchEvents();
});
</script>
