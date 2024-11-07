import { ref } from 'vue';
import { useEventResponse } from '@/composables/useEventResponse.ts';
import { useUser } from '@/composables/useUser.ts';
import { Event, EventResponse, UserData } from '@/interface';

const selectedEvent = ref<Event | null>(null);
const selectedUserList = ref<UserData[]>([]);
const eventResponse = ref<EventResponse[]>([]);
const linedUpPlayers = ref<number[]>([]);
// const selectedUser = ref<UserData | null>(null);

/* validation errors */
const errorNotEnoughPlayers = ref(false);

export const useLineUp = () => {
  const loadSelectedEvent = async (game: Event) => {
    /* get event from vue component and add it to empty ref */
    selectedEvent.value = game;

    /* load prev function to get all necessary data from event */
    await getResponseForSelectedEvent(game.id);
  };

  const getResponseForSelectedEvent = async (id: number) => {
    const { fetchEventResponse, selectEventResponses } = useEventResponse();
    const { fetchAllUsers, completeUserData } = useUser();

    /* await functions */
    await fetchEventResponse(id, true);
    await fetchAllUsers();

    /* throw error if event hasn't enough players to line up complete team */
    errorNotEnoughPlayers.value = selectEventResponses.value < 11;

    /* add api data to custom ref */
    eventResponse.value = selectEventResponses.value;

    /* handling errors while selecting game */
    if (errorNotEnoughPlayers.value) {
      console.warn(
        'Es gibt nicht genügend Spieler für eine Spielaufstellung! :/'
      );
    } else {
      console.clear();
    }

    /* get from user data all users which have reacted to this event */
    selectedUserList.value = completeUserData.value.filter((user) =>
      selectEventResponses.value.some((response) => response.userId === user.id)
    );
  };

  return {
    loadSelectedEvent,
    selectedEvent,
    selectedUserList,
    eventResponse,
    errorNotEnoughPlayers,
    linedUpPlayers,
  };
};
