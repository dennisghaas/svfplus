import { ref } from 'vue';
import { fetchDataFromApi } from '@/helpers/fetchDataFromApi.ts';
import { formatDate } from '@/helpers/formatDate.ts';
import { replaceSpaceWithDash } from '@/helpers/replaceSpaceWithDash.ts';
import { useLineUp } from '@/composables/useLineUp.ts';
import {
  Positions,
  LoadedLineUpSelectionNames,
  LoadedLineUp,
} from '@/interface';
import store from '@/store';

const loadedLineUps = ref<Positions[]>([]);
const loadedLineUp = ref<LoadedLineUp | null>(null);
const loadedLineUpSelectionNames = ref(<LoadedLineUpSelectionNames[]>[]);
const isExistingLineUp = ref(false);

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
        author: item.author,
        name: item.name,
        id: item.id || null,
        updatedAt: item.updatedAt,
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
        'Ausgewählte Aufstellung konnte leider nicht geladen werden',
        error
      );
    }
  };

  const fetchLineUpById = async (id: number) => {
    try {
      const response = await fetchDataFromApi(`/lineup/${id}`, 'GET');
      loadedLineUp.value = response[0];

      /* add loaded data from api to lineUp refs */
      linedUpPlayers.value = loadedLineUp.value?.linedUpPlayers || [];
      selectedFormation.value = loadedLineUp.value?.selectedFormation || [];
      selectedFormationValue.value =
        loadedLineUp.value?.selectedFormationValue || '';
    } catch (error) {
      console.error(
        'Die ausgewählte Aufstellung konnte nicht geladen werden',
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
      console.error('Fehler beim speichern der Aufstellung aufgetreten', error);
    }
  };

  const deleteLineUpById = async (id: number) => {
    try {
      await fetchDataFromApi(`/lineup/${id}`, 'DELETE');
    } catch (error) {
      console.error('Aufstellung konnte leider nicht gelöscht werden', error);
    }
  };

  const editLineUpById = async (id: number | null) => {
    try {
      if (id) {
        const response = await fetchDataFromApi(`/lineup/${id}`, 'PUT', {
          author: store.state.userData.name,
          eventId: loadedLineUp.value?.eventId,
          linedUpPlayers: linedUpPlayers.value,
          name: loadedLineUp.value?.name,
          selectedFormation: selectedFormation.value,
          selectedFormationValue: selectedFormationValue.value,
        });

        console.log('Neue Formation', response);
      }
    } catch (error) {
      console.log(
        'Die Aufstellung konnte leider nicht aktualisiert werden',
        error
      );
    }
  };

  return {
    fetchLineUp,
    saveFormation,
    fetchNextLineUpId,
    fetchLineUpNames,
    fetchLineUpById,
    deleteLineUpById,
    editLineUpById,
    loadedLineUp,
    loadedLineUps,
    loadedLineUpSelectionNames,
    isExistingLineUp,
  };
};
