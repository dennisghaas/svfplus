import { ref } from 'vue';
import { useEventResponse } from '@/composables/useEventResponse.ts';
import { useUser } from '@/composables/useUser.ts';
import { Event, EventResponse, Positions, UserData } from '@/interface';

const selectedEvent = ref<Event | null>(null);
const selectedUserList = ref<UserData[]>([]);
const selectedFormation = ref<Positions[]>([]);
const selectedFormationValue = ref('');
const selectedPosition = ref<Positions | null>(null);
const eventResponse = ref<EventResponse[]>([]);
const linedUpPlayers = ref<number[]>([]);
const selectedUser = ref<UserData | null>(null);
const selectedUserId = ref(0);
const selectedPositionId = ref(0);

/* keys for dialog */
const switchPlayer = ref(false);
const playerToPosition = ref(false);
const positionToPlayer = ref(false);

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

    /* load response before users to check response length*/
    await fetchEventResponse(id, true);

    /* throw error if event hasn't enough players to line up complete team */
    errorNotEnoughPlayers.value = selectEventResponses.value.length < 11;

    if (!errorNotEnoughPlayers.value) {
      /* just load all data if component can be logical created */
      await fetchAllUsers();

      /* add api data to custom ref */
      eventResponse.value = selectEventResponses.value;

      /* get from user data all users which have reacted to this event */
      selectedUserList.value = completeUserData.value.filter((user) =>
        selectEventResponses.value.some(
          (response) => response.userId === user.id
        )
      );
    } else {
      /* handling errors while selecting game */
      console.warn(
        'Es gibt nicht genügend Spieler für eine Spielaufstellung! :/'
      );
    }
  };

  const selectedUserListEventResponse = (id: number | undefined) => {
    return eventResponse.value.find((response) => response.userId === id)
      ?.response;
  };

  const addPlayerToPosition = (pos: Positions, isSwitch?: boolean) => {
    selectedPosition.value = pos;

    if (!isSwitch) {
      handleDialogView('playerToPosition');
    } else {
      handleDialogView('switchPlayer');
    }
  };

  const addPositionToPlayer = (id: number) => {
    handleDialogView('positionToPlayer');
    findUserById(id);
  };

  const findUserById = (id: number | undefined) => {
    selectedUserList.value.forEach((user) => {
      if (user.id === id) {
        selectedUser.value = user;
      }
    });
  };

  const findPositionById = (id: number | undefined) => {
    selectedFormation.value.forEach((pos) => {
      if (pos.id === id) {
        selectedPosition.value = pos;
      }
    });
  };

  const removePlayerFromPosition = (pos: Positions) => {
    findUserById(pos.user?.id);

    if (pos) {
      pos.user = null;
      pos.isSelected = false;

      linedUpPlayers.value = linedUpPlayers.value.filter(
        (id) => id !== selectedUser.value?.id
      );
    }
  };

  const saveNewPlayer = (isSwitch?: boolean) => {
    if (!selectedUser.value || !selectedPosition.value) return;

    const storeSwitchedUserId = isSwitch
      ? selectedPosition.value.user?.id
      : null;

    selectedFormation.value.forEach((pos) => {
      if (pos.id === selectedPosition.value?.id) {
        pos.user = selectedUser.value;
        pos.isSelected = true;
      }
    });

    linedUpPlayers.value.push(selectedUser.value.id);

    if (isSwitch && storeSwitchedUserId) {
      linedUpPlayers.value = linedUpPlayers.value.filter(
        (id) => id !== storeSwitchedUserId
      );
    }
  };

  const saveNewPosition = () => {
    if (!selectedUser.value || !selectedPosition.value) return;

    selectedFormation.value.forEach((pos) => {
      if (pos.id === selectedPosition.value?.id) {
        pos.user = selectedUser.value;
        pos.isSelected = true;
      }
    });

    linedUpPlayers.value.push(selectedUser.value.id);
  };

  const handleDialogView = (key: string) => {
    if (key === 'playerToPosition') {
      playerToPosition.value = true;
      switchPlayer.value = false;
      positionToPlayer.value = false;
    } else if (key === 'switchPlayer') {
      playerToPosition.value = false;
      switchPlayer.value = true;
      positionToPlayer.value = false;
    } else {
      playerToPosition.value = false;
      switchPlayer.value = false;
      positionToPlayer.value = true;
    }
  };

  return {
    loadSelectedEvent,
    selectedUserListEventResponse,
    addPlayerToPosition,
    saveNewPlayer,
    findUserById,
    findPositionById,
    removePlayerFromPosition,
    addPositionToPlayer,
    saveNewPosition,
    selectedEvent,
    selectedUserList,
    eventResponse,
    errorNotEnoughPlayers,
    linedUpPlayers,
    playerToPosition,
    positionToPlayer,
    selectedFormation,
    selectedUser,
    selectedUserId,
    selectedPositionId,
    switchPlayer,
    selectedFormationValue,
  };
};
