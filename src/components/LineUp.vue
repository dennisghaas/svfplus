<template>
  <ul v-for="(game, index) in games" :key="index">
    <li>
      <button type="button" @click="loadSelectedEvent(game)">
        {{ game.eventDescription.title }}
        {{ game.eventDescription.subtitle }}
        {{ game.id }}
      </button>
    </li>
  </ul>

  <strong> Aufgestellte Spieler: </strong>
  <pre>
    {{ linedUpPlayers }}
  </pre>

  <template v-if="selectedEvent">
    <h2>{{ selectedEvent.id }} {{ selectedEvent.eventDescription.title }}</h2>
    <h3>{{ selectedEvent.eventDescription.subtitle}}</h3>
  </template>

  <template v-if="!errorNotEnoughPlayers">
    <template v-if="eventResponse && selectedUserList">
      <ul>
        <li v-for="(user, index) in selectedUserList" :key="index">
          <strong>{{ user.id }} + {{ user.name }}</strong>

          <!-- Check user response to event if Zusagen or Unsicher -->
          <template
            v-if="
              eventResponse.find((response) => response.userId === user.id)
                ?.response === 'Zusagen'
            "
          >
            <span class="d-flex">Zusagen => <i class="icon-thumb-up"></i></span>
          </template>
          <template v-else>
            <span class="d-flex"
              >Unsicher => <i class="icon-question-mark"></i
            ></span>
          </template>
        </li>
      </ul>
    </template>

    <template v-if="selectedUserList">
      <strong>Alle verfügbaren Spieler</strong><br />
      <ul>
        <li v-for="(user, index) in selectedUserList" :key="index">
          {{ user.id }} ~ {{ user.name }}
        </li>
      </ul>
    </template>
  </template>

  <template v-else>
    <BadgeType
      :badge-type="'warning'"
      :badge-text="'Es haben leider zu wenig Spieler zugesagt'"
      :badge-centered="true"
      :badge-alt="true"
    />
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEvents } from '@/composables/useEvents.ts';
import { useLineUp } from '@/composables/useLineUp.ts';
import { Event } from '@/interface';
import BadgeType from '@/components/BadgeType.vue';

const {
  loadSelectedEvent,
  selectedEvent,
  selectedUserList,
  eventResponse,
  errorNotEnoughPlayers,
  linedUpPlayers,
} = useLineUp();
const games = ref<Event[]>([]);

onMounted(async () => {
  const { fetchGames, events } = useEvents();
  await fetchGames();
  games.value = events.value;
});
</script>

<style scoped lang="scss"></style>
