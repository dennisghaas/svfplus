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
const updatedFormationNav = ref<string[]>([]);

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
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText('Aufstellungen werden geladen...');

    try {
      const response = await fetchDataFromApi('/lineup', 'GET');
      loadedLineUps.value = response;

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    } catch (error) {
      console.error(
        'Ausgewählte Aufstellung konnte leider nicht geladen werden',
        error
      );

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const fetchLineUpById = async (id: number) => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText('Aufstellungen werden geladen...');

    try {
      const response = await fetchDataFromApi(`/lineup/${id}`, 'GET');
      loadedLineUp.value = response[0];

      /* add loaded data from api to lineUp refs */
      linedUpPlayers.value = loadedLineUp.value?.linedUpPlayers || [];
      selectedFormation.value = loadedLineUp.value?.selectedFormation || [];
      selectedFormationValue.value =
        loadedLineUp.value?.selectedFormationValue || '';

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    } catch (error) {
      console.error(
        'Die ausgewählte Aufstellung konnte nicht geladen werden',
        error
      );

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const saveFormation = async (router: any) => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText('Aufstellungen wird gespeichert...');

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
          (selectedEvent.value?.eventDescription?.subtitle
            ? replaceSpaceWithDash(
                selectedEvent.value.eventDescription.subtitle
              ).toLowerCase()
            : 'default-subtitle') +
          (selectedEvent.value?.eventDescription?.title
            ? replaceSpaceWithDash(
                selectedEvent.value.eventDescription.title
              ).toLowerCase()
            : 'default-title'),
        selectedFormation: selectedFormation.value,
        selectedFormationValue: selectedFormationValue.value,
      });

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');

      /* reload page */
      router.go();
    } catch (error) {
      console.error('Fehler beim speichern der Aufstellung aufgetreten', error);

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const deleteLineUpById = async (id: number, router: any) => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText(
      'Aufstellung wird gelöscht. Seite wird neu geladen...'
    );

    try {
      await fetchDataFromApi(`/lineup/${id}`, 'DELETE');

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');

      /* reload page if deletion is successful */
      router.go();
    } catch (error) {
      console.error('Aufstellung konnte leider nicht gelöscht werden', error);

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const editLineUpById = async (id: number | null, router: any) => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText(
      'Aufstellung wird aktualisiert. Seite wird neu geladen...'
    );

    try {
      if (id) {
        await fetchDataFromApi(`/lineup/${id}`, 'PUT', {
          author: store.state.userData.name,
          eventId: loadedLineUp.value?.eventId,
          linedUpPlayers: linedUpPlayers.value,
          name: loadedLineUp.value?.name,
          selectedFormation: selectedFormation.value,
          selectedFormationValue: selectedFormationValue.value,
        });

        // DEBUG = console.log('Neue Formation', response);

        store.updateLoadingResponse(false);
        store.updateOverflowHidden(false);
        store.updateLoadingResponseText('');
      }

      /* reload page if put was successful */
      router.go();
    } catch (error) {
      console.log(
        'Die Aufstellung konnte leider nicht aktualisiert werden',
        error
      );

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
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
    updatedFormationNav,
  };
};
