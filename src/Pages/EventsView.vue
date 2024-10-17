<template>
  <EventsViewPagination
    :hide-prev-button="
      initialCurrentMonth === currentMonth && initialCurrentYear === currentYear
    "
    @update-prev-month="prevMonth()"
    @update-next-month="nextMonth()"
  />

  <template v-for="(weekData, index) in eventsForWeeks" :key="index">
    <SectionType
      :class="[
        'events-view--week mt-0',
        { 'events-view--week__is-current': isCurrentWeek(weekData.week) },
      ]"
      :section-header="true"
      v-if="!isWeekBeforeToday(weekData.week[6])"
    >
      <template #sectionHeaderLeft>
        <h2>
          <template v-if="isCurrentWeek(weekData.week)">👉</template>
          {{ index + 1 }}.
          {{ formatMonthToWord(currentMonth.toString(), true) }} Woche:
        </h2>
        {{ resolveWeekDate(weekData.week[0], true) }} -
        {{ resolveWeekDate(weekData.week[6], false) }}
      </template>

      <template #sectionContent>
        <div class="row" v-if="weekData.events.length">
          <template v-for="event in weekData.events" :key="event.id">
            <div class="col-xl-4 col-sm-6 col-xs-12">
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
          </template>
        </div>
        <div v-else>
          <BadgeType
            :badge-text="'Keine Termine in dieser Woche'"
            :badge-type="'info'"
          />
        </div>
      </template>
    </SectionType>
  </template>

  <EventsViewPagination
    :aligned-top="true"
    :hide-prev-button="
      initialCurrentMonth === currentMonth && initialCurrentYear === currentYear
    "
    @update-prev-month="prevMonth()"
    @update-next-month="nextMonth()"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useEvents } from '@/composables/useEvents.ts';
import { formatMonthToWord } from '@/helpers/formatMonthToWord.ts';
import { useWeeksInMonth } from '@/composables/useWeekInMonth.ts';
import { formatDate } from '@/helpers/formatDate.ts';
import { useHandleEventViewAccess } from '@/composables/useHandleEventViewAccess.ts';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import store from '@/store';
import CardEvent from '@/components/CardEvent.vue';
import BadgeType from '@/components/BadgeType.vue';
import SectionType from '@/components/SectionType.vue';
import EventsViewPagination from '@/components/EventsViewPagination.vue';
const { fetchEvents, events } = useEvents();
const currentDate = new Date();

const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());
const initialCurrentMonth = ref(currentDate.getMonth());
const initialCurrentYear = ref(currentDate.getFullYear());
const { weeks } = useWeeksInMonth(currentMonth.value, currentYear.value);

const route = useRoute();
const router = useRouter();
const { addQueryParams } = useHandleEventViewAccess();

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }

  updateWeeks();

  // Aktualisiere die URL-Query-Parameter
  addQueryParams(route, router, {
    year: currentYear.value.toString(),
    month: currentMonth.value.toString(),
  });

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }

  updateWeeks();

  // Aktualisiere die URL-Query-Parameter
  addQueryParams(route, router, {
    year: currentYear.value.toString(),
    month: currentMonth.value.toString(),
  });

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

const updateWeeks = async () => {
  const weekComposable = useWeeksInMonth(currentMonth.value, currentYear.value);

  if (weekComposable && weekComposable.calculateWeeks) {
    weekComposable.calculateWeeks();
    if (Array.isArray(weekComposable.weeks.value)) {
      weeks.value = weekComposable.weeks.value;
    } else {
      console.error('Fehler: weekComposable.weeks ist kein Array');
    }
  } else {
    console.error(
      'Fehler: weekComposable oder calculateWeeks ist nicht definiert',
    );
  }
};

const eventsForWeeks = computed(() => {
  return weeks.value.map((week) => {
    const startOfWeek = new Date(week[0]);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(week[6]);
    endOfWeek.setHours(23, 59, 59, 999);

    const sortedEvents = events.value
      .filter((event) => {
        // Check if event.eventDate is not null before creating Date object
        if (event.eventDate) {
          const eventDate = new Date(event.eventDate);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        }
        return false; // Exclude events with null eventDate
      })
      .sort((a, b) => {
        // Ensure to handle null values in eventDate
        const dateA = a.eventDate ? new Date(a.eventDate) : new Date(0); // default to epoch if null
        const dateB = b.eventDate ? new Date(b.eventDate) : new Date(0); // default to epoch if null
        return dateA.getTime() - dateB.getTime();
      });

    return {
      week,
      events: sortedEvents,
    };
  });
});

const resolveWeekDate = (date: string, hideYear: boolean) => {
  const day = formatDate(date).day;
  const month = formatDate(date).month;
  const year = formatDate(date).year;

  if (!hideYear) {
    return `${day}.${month}.${year}`;
  } else {
    return `${day}.${month}`;
  }
};

const todayDate = new Date().toISOString().split('T')[0];
const isWeekBeforeToday = (weekDate: string) => {
  const weekEndDate = new Date(weekDate);
  const today = new Date(todayDate);
  return weekEndDate < today;
};

const isCurrentWeek = (week: any) => {
  return week.includes(todayDate);
};

onMounted(async () => {
  const monthQuery = route.query.month ? parseInt(route.query.month as string) : null;
  const yearQuery = route.query.year ? parseInt(route.query.year as string) : null;

  // If the query is missing, set it to current month and year
  if (!monthQuery || !yearQuery) {
    addQueryParams(route, router, {
      year: currentYear.value.toString(),
      month: currentMonth.value.toString(),
    });
  }

  // Use the query values or fallbacks
  currentMonth.value = monthQuery !== null ? monthQuery : currentDate.getMonth();
  currentYear.value = yearQuery !== null ? yearQuery : currentDate.getFullYear();

  // Initial fetch handled in watch, no need to duplicate here
  store.pageHeadline(`Termine im ${formatMonthToWord(currentMonth.value.toString(), true)}`);
});

watch(
    () => route.query, // Watch the query parameters
    async (newQuery) => {
      if (newQuery.year && newQuery.month) {
        // Update year and month based on the new query parameters
        currentYear.value = parseInt(newQuery.year as string);
        currentMonth.value = parseInt(newQuery.month as string);

        // Fetch events and update weeks
        await fetchEvents();
        await updateWeeks();

        store.pageHeadline(`Termine im ${formatMonthToWord(currentMonth.value.toString(), true)}`);
      }
    },
    { immediate: true }
);
</script>

<style lang="scss">
.events-view--week {
  .section--header {
    margin-bottom: 0;
    padding: rem(20px) 0;
    position: sticky;
    top: 0;
    left: 0;
    background: var(--gray-soft);
    z-index: 2;
  }
}
</style>
