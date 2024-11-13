import { ref } from 'vue';
import { fetchDataFromApi } from '@/helpers/fetchDataFromApi.ts';
import { formatDate } from '@/helpers/formatDate.ts';
import { replaceSpaceWithDash } from '@/helpers/replaceSpaceWithDash.ts';
import { useLineUp } from '@/composables/useLineUp.ts';
import { Positions, LoadedLineUpSelectionNames } from '@/interface';
import store from '@/store';

const loadedLineUps = ref<Positions[]>([]);
const loadedLineUpSelectionNames = ref(<LoadedLineUpSelectionNames[]>[]);

const {
  selectedEvent,
  linedUpPlayers,
  selectedFormation,
  selectedFormationValue,
} = useLineUp();

export const useLineUpResponses = () => {
  const fetchNextLineUpId = async () => {
    try {
      const response = await fetchDataFromApi('/lineup', 'GET');
      const ids = response.map((item: any) => item.id);

      if (ids.length > 0) {
        const lastId = ids[ids.length - 1];
        return lastId + 1;
      } else {
        return 1;
      }
    } catch (error) {
      console.log('Es konnte keine nächste ID gefunden werden', error);
      return null;
    }
  };

  const fetchLineUpNames = async () => {
    try {
      const response = await fetchDataFromApi('/lineup', 'GET');

      /* passing data from api to client ref */
      loadedLineUpSelectionNames.value = response.map((item: any) => ({
        name: item.name,
        id: item.id || null,
      }));
    } catch (error) {
      console.error('Error fetching name values:', error);
    }
  };

  const fetchLineUp = async () => {
    try {
      const response = await fetchDataFromApi('/lineup', 'GET');
      loadedLineUps.value = response;
    } catch (error) {
      console.error(
        'Ausgewählte Formation konnte leider nicht geladen werden',
        error
      );
    }
  };

  const saveFormation = async () => {
    const d = new Date().toISOString();
    const numericDate =
      formatDate(d).year + formatDate(d).month + formatDate(d).day;

    try {
      const lastId = (await fetchNextLineUpId()) ?? 1;
      await fetchDataFromApi('/lineup', 'POST', {
        author: store.state.userData.name,
        eventId: selectedEvent.value?.id ?? null,
        linedUpPlayers: linedUpPlayers.value,
        name:
          lastId +
          '_' +
          numericDate +
          '_' +
          (selectedEvent.value?.eventDescription?.title
            ? replaceSpaceWithDash(
                selectedEvent.value.eventDescription.title
              ).toLowerCase()
            : 'default-title') +
          '-' +
          (selectedEvent.value?.eventDescription?.subtitle
            ? replaceSpaceWithDash(
                selectedEvent.value.eventDescription.subtitle
              ).toLowerCase()
            : 'default-subtitle'),
        selectedFormation: selectedFormation.value,
        selectedFormationValue: selectedFormationValue.value,
      });
    } catch (error) {
      console.error('Fehler beim speichern der Formation aufgetreten', error);
    }
  };

  return {
    fetchLineUp,
    saveFormation,
    fetchNextLineUpId,
    fetchLineUpNames,
    loadedLineUps,
    loadedLineUpSelectionNames,
  };
};
