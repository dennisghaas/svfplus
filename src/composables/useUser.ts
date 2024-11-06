import { ref } from 'vue';
import { fetchDataFromApi } from '@/helpers/fetchDataFromApi.ts';
import { BlockList, UserData } from '@/interface';
import store from '@/store';

const id = ref(null);
const accessRights = ref('');
const birthday = ref(new Date('1955-01-01'));
const debts = ref(0);
const email = ref('');
const gotRejected = ref(false);
const gotSuit = ref(false);
const isInjured = ref(false);
const isInjuredType = ref('');
const isInjuredUntil = ref(new Date('1955-01-01'));
const jerseyNumber = ref(0);
const name = ref('');
const password = ref('');
const position = ref('');
const role = ref('');
const surname = ref('');
const userIsActivated = ref(false);
const bgColor = ref('');
const bgImage = ref('');
const initials = ref('');
const username = ref('');
const userNotFound = ref(false);
const watchedTutorial = ref(false);

/* error refs */
const responseMessage = ref('');
const isError = ref(false);

/* data objects to store data from api */
const blockList = ref<BlockList[]>([]);
const selectedUser = ref<UserData | null>(null);
const completeUserData = ref<UserData[]>([]);

export const useUser = () => {
  const userResponse = () => {
    return {
      accessRights: accessRights.value,
      birthday: birthday.value,
      debts: debts.value,
      email: email.value,
      gotRejected: gotRejected.value,
      gotSuit: gotSuit.value,
      id: id.value,
      isInjured: isInjured.value,
      isInjuredType: isInjuredType.value,
      isInjuredUntil: isInjuredUntil.value,
      jerseyNumber: jerseyNumber.value,
      name: name.value,
      password: password.value,
      position: position.value,
      role: role.value,
      surname: surname.value,
      userImage: {
        bgColor: bgColor.value,
        bgImage: bgImage.value,
        initials: initials.value,
      },
      userIsActivated: userIsActivated.value,
      username: username.value,
      watchedTutorial: watchedTutorial.value,
    };
  };

  const setUserFields = (user: any, updates: any) => {
    accessRights.value = user.accessRights;
    birthday.value = user.birthday;
    debts.value = user.debts;
    email.value = user.email;
    gotSuit.value = user.gotSuit;
    id.value = user.id;
    isInjured.value = user.isInjured;
    isInjuredType.value = user.isInjuredType;
    isInjuredUntil.value = user.isInjuredUntil;
    jerseyNumber.value = user.jerseyNumber;
    name.value = user.name;
    password.value = user.password;
    position.value = user.position;
    role.value = user.role;
    surname.value = user.surname;
    bgColor.value = user.userImage.bgColor;
    bgImage.value = user.userImage.bgImage;
    initials.value = user.userImage.initials;
    username.value = user.username;
    watchedTutorial.value = user.watchedTutorial;

    Object.keys(updates).forEach((key) => {
      if (key in user) {
        const value = updates[key];
        console.log(`Updating ${key} to ${value}`);
        switch (key) {
          case 'userIsActivated':
            userIsActivated.value = value;
            break;
          case 'gotRejected':
            gotRejected.value = value;
            break;
          case 'name':
            name.value = value;
            break;
          case 'surname':
            surname.value = value;
            break;
          case 'position':
            position.value = value;
            break;
          case 'jerseyNumber':
            jerseyNumber.value = value;
            break;
          case 'birthday':
            birthday.value = value;
            break;
          case 'gotSuit':
            gotSuit.value = value;
            break;
          case 'debts':
            debts.value = value;
            break;
          case 'role':
            role.value = value;
            break;
          case 'accessRights':
            accessRights.value = value;
            break;
          case 'isInjured':
            isInjured.value = value;
            break;
          case 'isInjuredType':
            isInjuredType.value = value;
            break;
          case 'isInjuredUntil':
            isInjuredUntil.value = value;
            break;
          case 'initials':
            initials.value = value;
            break;
          case 'watchedTutorial':
            watchedTutorial.value = value;
            break;
          default:
            console.warn(`Unrecognized field: ${key}`);
        }
      }
    });
  };

  const updateUserByID = async (userID: number, router: any) => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);

    try {
      const payload = userResponse();
      console.log('Sending payload:', payload);
      await fetchDataFromApi(`/users/${userID}`, 'PUT', payload);

      store.updateLoadingResponseText(
        'Nutzerdaten werden aktualisiert. Seite wird neu geladen...'
      );

      router.go();
    } catch (error) {
      store.updateLoadingResponse(true);
      store.updateOverflowHidden(true);
      store.updateLoadingResponseText('');
      console.error(
        'Beim bearbeiten des Users ist leider ein Fehler aufgetreten',
        error
      );
    }
  };

  const changePassword = async (
    id: number,
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      await fetchDataFromApi(`/users/change-password`, 'PUT', {
        userId: id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      responseMessage.value = 'Passwort erfolgreich geändert';
      isError.value = false;
    } catch (error: any) {
      if (error instanceof Response) {
        const errorData = await error.json();
        responseMessage.value =
          errorData.error || 'Ein unbekannter Fehler ist aufgetreten';
      } else if (error && typeof error === 'object' && 'message' in error) {
        // Handle case where error is an object with a message property
        responseMessage.value = `Fehler beim Ändern des Passworts: ${(error as Error).message}`;
      } else {
        // Handle all other cases (e.g., a string, undefined, or a generic error)
        responseMessage.value = 'Fehler beim Ändern des Passworts';
      }
      isError.value = true;
    }
  };

  const fetchAllUsers = async () => {
    store.updateLoadingResponse(true);
    store.updateOverflowHidden(true);
    store.updateLoadingResponseText('Nutzer werden geladen...');

    try {
      const response = await fetchDataFromApi('/users', 'GET');
      completeUserData.value = response;

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    } catch (error: any) {
      console.log('Fehler beim Abrufen aller Nutzerdaten', error);

      store.updateLoadingResponse(false);
      store.updateOverflowHidden(false);
      store.updateLoadingResponseText('');
    }
  };

  const getUserByID = async (userID: number) => {
    try {
      const response = await fetchDataFromApi(`/users/${userID}`, 'GET');
      selectedUser.value = response;
      userNotFound.value = false;
    } catch (error) {
      console.log(`Fehler beim Laden der Userdaten für ${userID}`, error);
      userNotFound.value = true;

      console.clear();
    }
  };

  const deleteUserByID = async (userID: number) => {
    try {
      await fetchDataFromApi(`/users/${userID}`, 'DELETE');
    } catch (error) {
      console.log('Fehler beim Löschen des Users', error);
    }
  };

  const blockUserByID = async (
    userID: number,
    email: string,
    username: string,
    router: any
  ) => {
    try {
      await fetchDataFromApi(`/block`, 'POST', {
        email: email,
        username: username,
      });
      await deleteUserByID(userID);

      router.go();
    } catch (error) {
      console.error('Nutzer konnte nicht blockiert werden', error);
    }
  };

  const fetchBlockList = async () => {
    try {
      const response = await fetchDataFromApi(`/blocked-users`, 'GET');
      blockList.value = response;
    } catch (error) {
      console.error('Blockliste konnte nicht geladen werden', error);
    }
  };

  const unblockUserByID = async (blockID: number, router: any) => {
    try {
      await fetchDataFromApi(`/blocked-users/${blockID}`, 'DELETE');
      router.go();
    } catch (error) {
      console.log(
        'Der geblockte User konnte nicht von der Blockliste genommen werden',
        error
      );
    }
  };

  return {
    updateUserByID,
    setUserFields,
    blockUserByID,
    unblockUserByID,
    fetchBlockList,
    getUserByID,
    changePassword,
    fetchAllUsers,
    completeUserData,
    responseMessage,
    id,
    accessRights,
    birthday,
    bgColor,
    bgImage,
    debts,
    email,
    initials,
    gotRejected,
    gotSuit,
    isInjured,
    isInjuredType,
    isInjuredUntil,
    jerseyNumber,
    name,
    password,
    position,
    role,
    surname,
    userIsActivated,
    username,
    blockList,
    selectedUser,
    userNotFound,
    isError,
  };
};
