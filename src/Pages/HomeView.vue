<template>
  <template v-if="isMobile || isTablet">
    <h1>{{ store.state.pageHeadline }}</h1>
  </template>

  <SectionType
    v-if="todaysBirthdayList && todaysBirthdayList.length > 0"
    :class="'mt-0'"
  >
    <template #sectionContent>
      <div class="row">
        <div
          v-for="item in todaysBirthdayList"
          :key="item.id"
          class="col-xs-12 col-xl-6"
        >
          <CardBirthday :birthday-user="item" />
        </div>
      </div>
    </template>
  </SectionType>

  <SectionType
    v-if="filteredDashboardEvents.length > 0 && !allEventsResponded"
    :section-header="true"
  >
    <template #sectionHeaderLeft>
      <h2>Übersicht: Wichtige Termine</h2>
      <div class="body-text-b2">
        <p>
          Deine Trainer haben diese Termine als
          <u>äußert wichtig</u> gekennzeichnet. Bitte schnellstmöglich
          antworten. Sobald das geschehen ist, verschwinden diese aus deinem
          Dashboard 🚀
        </p>
      </div>
    </template>
    <template #sectionContent>
      <div class="row">
        <template
          v-for="(item, index) in filteredDashboardEvents"
          :key="item.id"
        >
          <div
            v-if="!eventResponses[index].response"
            class="col-xl-4 col-sm-6 col-xs-12"
          >
            <CardEvent
              :id="item.id"
              :event-type="item.eventType"
              :title="item.eventDescription.title"
              :subtitle="item.eventDescription.subtitle"
              :event-date="item.eventDate ?? ''"
              :meet-at="item.eventDescription.meetAt ?? ''"
              :begin-at="item.eventDescription.beginAt ?? ''"
              :end-at="item.eventDescription.endAt ?? ''"
              :description="item.eventDescription.description"
              :time-to-react="item.eventDescription.deadlineToStart ?? ''"
              :player-with-no-access="item.playerWithNoAccess"
              :standing-order-i-d="item.standingOrderID"
              :venue="item.venue"
              :venue-street="item.venueStreet"
              :venue-postal-code="item.venuePostalCode"
              :link-extern="item.linkExtern"
              :vote-question="item.voteQuestion"
              :vote-options="item.voteOptions"
              :vote-multiple-selection="item.voteMultipleSelection"
            />
          </div>
        </template>
      </div>
    </template>
  </SectionType>

  <SectionType :section-header="true" :class="allEventsResponded ? 'mt-0' : ''">
    <template #sectionHeaderLeft>
      <h2>Anstehende Termine</h2>
    </template>
    <template #sectionHeaderRight>
      <router-link to="/termine">Alle Termine ansehen</router-link>
    </template>
    <template #sectionContent>
      <UpcomingEvents />
    </template>
  </SectionType>

  <SectionType :section-header="true">
    <template #sectionHeaderLeft>
      <h2>Anstehende Geburtstage</h2>
    </template>
    <template #sectionHeaderRight />
    <template #sectionContent>
      <div v-if="nextBirthdaysList && nextBirthdaysList.length > 0" class="row">
        <div
          v-for="item in nextBirthdaysList"
          :key="item.id"
          class="col-xs-12 col-sm-6 col-xl-4"
        >
          <CardBirthdayAlt :birthday-user="item" />
        </div>
      </div>
    </template>
  </SectionType>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import { useEvents } from '@/composables/useEvents.ts';
import { useEventResponse } from '@/composables/useEventResponse.ts';
import { useBirthdays } from '@/composables/useBirthdays.ts';
import store from '@/store';
import CardEvent from '@/components/CardEvent.vue';
import SectionType from '@/components/SectionType.vue';
import UpcomingEvents from '@/components/UpcomingEvents.vue';
import CardBirthday from '@/components/CardBirthday.vue';
import CardBirthdayAlt from '@/components/CardBirthdayAlt.vue';

const { isTablet, isMobile } = useBreakpoint();
const { events } = useEvents();
const { fetchUserResponseToEvent, getResponseForEvent } = useEventResponse();
const { getNextBirthdays, todaysBirthdayList, nextBirthdaysList } =
  useBirthdays();

// Filter dashboard events
const filteredDashboardEvents = computed(() => {
  return events.value.filter((event) => event.showInDashboard);
});

// For each event, get the corresponding response
const eventResponses = computed(() => {
  return filteredDashboardEvents.value.map((event) => ({
    eventId: event.id,
    response: getResponseForEvent(event.id), // Get response for each event ID
  }));
});

// Computed property to check if all events have been responded to
const allEventsResponded = computed(() => {
  return filteredDashboardEvents.value.every(
    (_, index) => eventResponses.value[index].response
  );
});

onMounted(() => {
  // Fetch responses for each event shown in the dashboard
  filteredDashboardEvents.value.forEach((event) => {
    fetchUserResponseToEvent(event.id); // Call with each event ID
  });

  store.pageHeadline(`Moin ${store.state.userData.name}`);

  /* calling birthday functions */
  getNextBirthdays();
});
</script>

<style scoped lang="scss"></style>
