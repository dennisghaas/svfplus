import { ref } from 'vue';
import { fetchDataFromApi } from '@/helpers/fetchDataFromApi.ts';
import { extractDateAndTime } from '@/helpers/extractDateAndTime.ts';
import { Event, Reaction } from '@/interface';

const pastPractices = ref<Event[]>([]);
const pastPracticesIds = ref<number[]>([]);
const currentUser = ref(0);
const participationList = ref(<Reaction[]>[]);
const noResponsesFound = ref(false);
const responseLoading = ref(true);

export const usePracticeParticipation = () => {
  const getPastPractices = async () => {
    const today = new Date();
    const response = await fetchDataFromApi('/events', 'GET');

    if (response && Array.isArray(response)) {
      const events: Event[] = response as Event[];

      const filteredEvents = events.filter(
        (event) => event.eventType === 'Training'
      );

      pastPractices.value = filteredEvents
        .filter((practice) => {
          if (practice.eventDate) {
            const eventDate = new Date(
              extractDateAndTime(practice.eventDate).day
            );
            return today >= eventDate;
          }
          return false;
        })
        .reverse()
        .slice(0, 4);

      pastPractices.value.forEach((practice) => {
        const isExist = pastPracticesIds.value.includes(practice.id);
        if (!isExist) {
          pastPracticesIds.value.push(practice.id);
        }
      });
    }
  };

  const getPageUser = (userId: number) => {
    currentUser.value = userId;
  };

  const fetchEventResponse = async () => {
    const previousUserId = ref<number | null>(null);
    const hasUserIdChanged = previousUserId.value !== currentUser.value;

    // Wenn sich die User-ID geändert hat, Liste zurücksetzen
    if (hasUserIdChanged) {
      participationList.value = [];
      noResponsesFound.value = false;
      responseLoading.value = true; // Ladeindikator starten
      previousUserId.value = currentUser.value;
    }

    try {
      await getPastPractices();

      // Für jede vergangene Praxis die Antwort holen
      for (const eventId of pastPracticesIds.value) {
        const response = await fetchDataFromApi(
          `/event-responses/${currentUser.value}/${eventId}`
        );

        if (response) {
          const alreadyExists = participationList.value.some(
            (item) => item.eventId === response.eventId
          );

          if (!alreadyExists) {
            participationList.value.push(response);
          }
        } else {
          noResponsesFound.value = true; // Keine Antwort gefunden
        }
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Event-Responses:', error);
      noResponsesFound.value = true; // Fehler bedeutet keine gültigen Daten
    } finally {
      responseLoading.value = false; // Ladeindikator stoppen
    }
  };

  return {
    getPageUser,
    fetchEventResponse,
    participationList,
    noResponsesFound,
    responseLoading,
  };
};
