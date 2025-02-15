import { ref, onMounted } from 'vue';
import { fetchDataFromApi } from '@/helpers/fetchDataFromApi.ts';
import { combineDateAndTime } from '@/helpers/combineDateAndTime.ts';
import { subtractHours } from '@/helpers/substractHours.ts';
import { extractDateAndTime } from '@/helpers/extractDateAndTime.ts';
import { useEventResponse } from '@/composables/useEventResponse.ts';
import store from '@/store';
import { ApiError } from '@/interface';
import { Event, StandingOrder } from '@/interface';

const events = ref<Event[]>([]);
const selectedEvent = ref<Event[]>([]);
const selectedSingleEvent = ref<Event | null>(null);
const eventDate = ref(new Date());
const eventCreatedSuccessful = ref(false);
const title = ref('');
const subtitle = ref('');
const description = ref('');
const deadlineToStart = ref<string | null>(null);
const meetAt = ref('');
const beginAt = ref('');
const endAt = ref('');
const eventType = ref('Training');
const linkExtern = ref('');
const playerWithNoAccess = ref<string[]>([]);
const showInDashboard = ref(false);
const venue = ref('Auswärtsspiel');
const venuePostalCode = ref('');
const venueStreet = ref('');
const voteOptions = ref([
  { text: '', index: 0 },
  { text: '', index: 1 },
]);
const voteQuestion = ref('');
const voteMultipleSelection = ref(false);
const trainingStandingOrderObject = ref<any[]>([]);
const standingOrderID = ref<number | null>(null);
const standingOrderArray = ref<StandingOrder[]>([]);

const { deleteEventResponseByID } = useEventResponse();

export const useEvents = () => {
  const fetchEvents = async () => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText('Events werden geladen...');

    try {
      const response = await fetchDataFromApi('/events', 'GET');
      events.value = response;

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    } catch (error) {
      console.error('Error fetching events:', error);

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetchDataFromApi('/events', 'GET');

      // Filtert nur Events vom Typ 'Spiel' und deren Datum ab heute
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      const filteredEvents = response
        .filter(
          (event: Event) =>
            event.eventType === 'Spiel' &&
            event.eventDate !== null && // Null-Werte ausschließen
            new Date(event.eventDate) >= yesterday
        )
        .sort(
          (a: Event, b: Event) =>
            new Date(a.eventDate!).getTime() - new Date(b.eventDate!).getTime()
        )
        .slice(0, 3);

      events.value = filteredEvents;
    } catch (error) {
      console.error('Fehler beim Abrufen der Events:', error);
    }
  };

  const fetchSingleEventById = async (id: number | undefined | null) => {
    try {
      if (id) {
        selectedSingleEvent.value = await fetchDataFromApi(
          `/events/${id}`,
          'GET'
        );
      }
    } catch (error) {
      console.error('Blöd');
    }
  };

  const fetchEventsByID = async (id?: number, ids?: number[]) => {
    try {
      if (id && !ids) {
        const response = await fetchDataFromApi(`/events/${id}`, 'GET');
        selectedEvent.value = [response];
      } else {
        const responses = [];
        if (ids) {
          for (const eventId of ids) {
            const response = await fetchDataFromApi(
              `/events/${eventId}`,
              'GET'
            );
            responses.push(response);
          }
        }
        selectedEvent.value = responses;
      }
    } catch (error) {
      console.log(`Event ${id} konnte nicht geladen werden`, error);
    }
  };

  const fetchStandingOrder = async () => {
    try {
      const response = await fetchDataFromApi('/standing-orders', 'GET');
      const responseLength = response.length;
      const responseLastEntry = response[responseLength - 1]; // transform to zero based index
      standingOrderID.value = responseLastEntry.id + 1; // count up id
    } catch (error) {
      console.clear(); // remove warning if no standing order was found
      standingOrderID.value = 1; // set up base id to start from 1
    }

    console.log('standing order value', standingOrderID.value);
  };

  const fetchStandingOrderResponse = async () => {
    try {
      const response = await fetchDataFromApi('/standing-orders', 'GET');
      standingOrderArray.value = response;
    } catch (error) {
      console.log('Fehler beim Abrufen aller Daueraufträge', error);
    }
  };

  const createStandingOrder = async (eventIDs: number[]) => {
    try {
      const response = await fetchDataFromApi('/standing-orders', 'POST', {
        standingOrderID: standingOrderID.value,
        eventIDs: eventIDs,
      });
      return response;
    } catch (error) {
      console.log('Fehler bei Erstellung für Objekt des Dauerauftrages', error);
    }
  };

  const payLoad = (
    date?: string | null,
    genericDeadline?: string | null,
    isStandingOrder?: boolean
  ) => {
    console.log(store.state.userData.username);
    return {
      author: store.state.userData.username,
      eventDate: date || eventDate.value,
      eventDescription: {
        title: title.value,
        subtitle: subtitle.value,
        description: description.value,
        meetAt: meetAt.value,
        beginAt: beginAt.value,
        endAt: endAt.value,
        deadlineToStart: genericDeadline || deadlineToStart.value,
      },
      eventType: eventType.value,
      linkExtern: linkExtern.value,
      playerWithNoAccess: playerWithNoAccess.value,
      showInDashboard: showInDashboard.value,
      venue: venue.value,
      venuePostalCode: venuePostalCode.value,
      venueStreet: venueStreet.value,
      voteOptions: voteOptions.value,
      voteQuestion: voteQuestion.value,
      voteMultipleSelection: voteMultipleSelection.value,
      standingOrderID: isStandingOrder ? standingOrderID.value : null,
    };
  };

  const shiftToPreviousDay = (dateTime: string) => {
    const date = new Date(dateTime);
    date.setDate(date.getDate() - 1);
    return date.toISOString();
  };

  const createEvent = async () => {
    try {
      await fetchStandingOrder();

      const createAndSendPayload = async (
        date?: string | null,
        genericDeadline?: string | null,
        isStandingOrder?: boolean
      ) => {
        const payload = payLoad(date, genericDeadline, isStandingOrder);
        console.log(payload);

        try {
          const response = await fetchDataFromApi(
            '/events/create',
            'POST',
            payload
          );

          if (!response || !response.id) {
            throw new Error('Unvollständige Antwort von der API.');
          }

          console.log('Event wurde erfolgreich erstellt', response);

          eventCreatedSuccessful.value = true;
          store.resetCreateCardSelected();

          return response.id;
        } catch (error) {
          const apiError: ApiError = error as ApiError;
          console.error('Fehler bei der API-Anfrage:', apiError.message);

          if (apiError.status) {
            console.error('Statuscode:', apiError.status);
          }
          if (apiError.details) {
            console.error('Zusätzliche Details:', apiError.details);
          }

          eventCreatedSuccessful.value = false;
          throw apiError;
        }
      };

      if (
        eventType.value === 'Training' &&
        trainingStandingOrderObject.value.length >= 1
      ) {
        const eventIDs: number[] = [];
        console.log(
          'Standing order dates (trainingStandingOrderObject):',
          trainingStandingOrderObject.value
        );

        for (const date of trainingStandingOrderObject.value) {
          const eventDate = combineDateAndTime(date, beginAt.value);
          const deadlineTime = subtractHours(meetAt.value, 1);
          const genericDeadline = deadlineTime
            ? shiftToPreviousDay(combineDateAndTime(date, deadlineTime)!)
            : null;

          try {
            const eventID = await createAndSendPayload(
              eventDate,
              genericDeadline,
              true
            );
            eventIDs.push(eventID);
            console.log('Created Event ID:', eventID);
          } catch (error) {
            console.error('Error creating event:', error);
          }
        }

        console.log('Event IDs for standing order:', eventIDs);

        if (eventIDs.length > 0) {
          await createStandingOrder(eventIDs);
        }
      } else {
        await createAndSendPayload();
        discardEventChanges();
      }
    } catch (error) {
      console.error('Fehler beim Erstellen des Events:', error);
    }
  };

  const fetchEventResponse = async () => {
    try {
      const response = await fetchDataFromApi(
        '/event-responses/overview/1',
        'GET'
      );
      return response;
    } catch (error) {
      console.error('Fehler beim Abrufen der Event-Antworten:', error);
    }
  };

  onMounted(() => {
    fetchEvents();
  });

  const discardEventChanges = () => {
    events.value = [];
    eventDate.value = new Date();
    title.value = '';
    subtitle.value = '';
    description.value = '';
    deadlineToStart.value = null;
    meetAt.value = '';
    beginAt.value = '';
    endAt.value = '';
    eventType.value = 'Training';
    linkExtern.value = '';
    playerWithNoAccess.value = [];
    showInDashboard.value = false;
    venue.value = 'Auswärtsspiel';
    venuePostalCode.value = '';
    venueStreet.value = '';
    voteOptions.value = [
      { text: '', index: 0 },
      { text: '', index: 1 },
    ];
    voteQuestion.value = '';
    voteMultipleSelection.value = false;
    trainingStandingOrderObject.value = [];
    standingOrderID.value = null;
  };

  const createNewEvent = () => {
    eventCreatedSuccessful.value = false;
  };

  const deleteEventById = async (
    id: number,
    router: any,
    eventType: string,
    ids?: number[]
  ) => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);

    try {
      if (id && !ids) {
        store.updateLoadingResponseText(
          'Event wird gelöscht. Seite wird neu geladen...'
        );

        if (eventType === 'Training') {
          // Fetch the necessary event and standing order data
          await fetchEventsByID(id);
          await fetchStandingOrderResponse();

          const foundStandingOrder = standingOrderArray.value.find((order) =>
            order.eventIDs.includes(id)
          );
          console.log(foundStandingOrder);

          const standingOrderEventIDs = foundStandingOrder?.eventIDs;
          console.log(standingOrderEventIDs);

          const standingOrder = foundStandingOrder?.id;
          console.log(standingOrder);

          // If eventID is found, call the API to delete the event from the standing order
          if (id) {
            try {
              // Delete the event from the standing order
              const deleteFromStandingOrderResponse = await fetchDataFromApi(
                `/standing-orders/${standingOrder}/event/${id}`,
                'DELETE'
              );
              const deleteEventResponse = await fetchDataFromApi(
                `/events/${id}`,
                'DELETE'
              );

              /* delete response for this event */
              await deleteEventResponseByID(id);

              /* reload page */
              router.go();

              return { deleteFromStandingOrderResponse, deleteEventResponse };
            } catch (error) {
              console.error('Error deleting event:', error);
            }
          } else {
            console.log('Event ID not found in the standing order.');
          }
        } else {
          const response = await fetchDataFromApi(`/events/${id}`, 'DELETE');

          /* delete response for this event */
          await deleteEventResponseByID(id);

          router.go();
          return response;
        }
      } else if (ids && ids.length > 0) {
        store.updateLoadingResponseText(
          'Events werden gelöscht. Seite wird neu geladen...'
        );

        const responses = [];
        let completedRequests = 0;

        for (const eventId of ids) {
          const response = await fetchDataFromApi(
            `/events/${eventId}`,
            'DELETE'
          );
          responses.push(response);
          completedRequests += 1;

          /* delete response for this event */
          await deleteEventResponseByID(eventId);

          if (completedRequests === ids.length) {
            store.updateLoadingResponse(false);
            store.updateOverflowHidden(false);
            store.updateLoadingResponseText('');
          }
        }

        router.go();

        return responses;
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Events:', error);
      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const deleteStandingOrderById = async (id: number) => {
    try {
      const response = await fetchDataFromApi(
        `/standing-orders/${id}`,
        'DELETE'
      );
      return response;
    } catch (error) {
      console.error(
        'Der Eintrag des Dauerauftrages konnte nicht gelöscht werden:',
        error
      );
    }
  };

  const generateGenericDate = (date: any, beginAt: string) => {
    return combineDateAndTime(date, beginAt);
  };

  const generateGenericDeadline = (date: any, meetAt: string) => {
    const deadlineTime = subtractHours(meetAt, 1);
    return combineDateAndTime(date, deadlineTime);
  };

  const editEventByID = async (
    id?: number,
    eT?: string,
    router?: any,
    isStandingOrder?: boolean,
    ids?: number[],
    eventDates?: string[]
  ) => {
    const isTraining = eT === 'Training';
    const genericDate = generateGenericDate(eventDate.value, beginAt.value);
    const genericDeadline = generateGenericDeadline(
      eventDate.value,
      meetAt.value
    );

    const newPayload = (
      orderID?: number,
      orderDate?: any,
      orderDeadline?: any
    ) => {
      return {
        author: store.state.userData.username,
        id: isStandingOrder ? orderID : id,
        eventDate: isTraining
          ? isStandingOrder
            ? orderDate
            : genericDate
          : eventDate.value,
        eventDescription: {
          title: title.value,
          subtitle: subtitle.value,
          description: description.value,
          meetAt: meetAt.value,
          beginAt: beginAt.value,
          endAt: endAt.value,
          deadlineToStart: isTraining
            ? isStandingOrder
              ? orderDeadline
              : genericDeadline
            : deadlineToStart.value,
        },
        eventType: eT,
        linkExtern: linkExtern.value,
        playerWithNoAccess: playerWithNoAccess.value,
        showInDashboard: showInDashboard.value,
        venue: venue.value,
        venuePostalCode: venuePostalCode.value,
        venueStreet: venueStreet.value,
        voteOptions: voteOptions.value,
        voteQuestion: voteQuestion.value,
        voteMultipleSelection: voteMultipleSelection.value,
        standingOrderID: standingOrderID.value,
      };
    };

    try {
      store.updateLoadingResponse(true);
      store.updateOverflowHidden(true);
      store.updateLoadingResponseText(
        'Änderungen gespeichert. Seite wird neu geladen...'
      );

      if (!isStandingOrder) {
        const payload = newPayload();
        const response = await fetchDataFromApi(
          `/events/${id}`,
          'PUT',
          payload
        );

        // Ensure UI updates happen only once for non-standing order
        setTimeout(() => {
          router.go();
          store.updateLoadingResponse(false);
          store.updateOverflowHidden(false);
        }, 750);

        return response;
      } else {
        const responses: any[] = [];

        if (ids && eventDates) {
          for (let i = 0; i < ids.length; i++) {
            const eventID = ids[i];
            const eventDateString = eventDates[i];
            const { day } = extractDateAndTime(eventDateString);
            const genericDate = generateGenericDate(day, beginAt.value);
            const genericDeadline = generateGenericDeadline(day, meetAt.value);
            const payload = newPayload(eventID, genericDate, genericDeadline);

            try {
              const response = await fetchDataFromApi(
                `/events/${eventID}`,
                'PUT',
                payload
              );
              responses.push(response);
            } catch (error) {
              console.error('Error updating event:', error);
            }
          }
        }

        // Ensure UI updates happen after all requests
        setTimeout(() => {
          router.go();
          store.updateLoadingResponse(false);
          store.updateOverflowHidden(false);
          store.updateLoadingResponseText('');
        }, 750);

        return responses;
      }
    } catch (error) {
      console.log('Event konnte nicht aktualisiert werden', error);
      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
      throw error; // Rethrow error to ensure it is handled properly if needed
    }
  };

  return {
    fetchEventResponse,
    fetchEvents,
    createEvent,
    discardEventChanges,
    createNewEvent,
    deleteEventById,
    fetchStandingOrderResponse,
    editEventByID,
    fetchEventsByID,
    deleteStandingOrderById,
    fetchGames,
    fetchSingleEventById,
    events,
    eventDate,
    title,
    subtitle,
    description,
    meetAt,
    beginAt,
    endAt,
    deadlineToStart,
    eventType,
    linkExtern,
    playerWithNoAccess,
    showInDashboard,
    venue,
    venuePostalCode,
    venueStreet,
    voteOptions,
    voteQuestion,
    voteMultipleSelection,
    trainingStandingOrderObject,
    standingOrderID,
    eventCreatedSuccessful,
    standingOrderArray,
    selectedEvent,
    selectedSingleEvent,
  };
};
