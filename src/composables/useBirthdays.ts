import { ref } from 'vue';
import { fetchDataFromApi } from '@/helpers/fetchDataFromApi.ts';
import { extractDateAndTime } from '@/helpers/extractDateAndTime.ts';
import { BirthdayObject } from '@/interface';

const birthdayList = ref<BirthdayObject[]>([]);
const nextBirthdaysList = ref(<BirthdayObject[]>[]);
const todaysBirthdayList = ref(<BirthdayObject[]>[]);

export const useBirthdays = () => {
  const createTodaysDate = () => {
    const todaysDate = new Date().toISOString();
    return extractDateAndTime(todaysDate).day;
  };

  function splitDate(date: string): [number, number, number] {
    const [year, month, day] = date.split('-').map(Number);
    return [year || 0, month || 0, day || 0];
  }

  const getAge = (birthday: string) => {
    if (!birthday) return 0;

    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getUTCFullYear() - birthDate.getUTCFullYear();

    // Prüfen, ob der Geburtstag in diesem Jahr noch nicht war
    const hasBirthdayPassed =
      today.getUTCMonth() > birthDate.getUTCMonth() ||
      (today.getUTCMonth() === birthDate.getUTCMonth() &&
        today.getUTCDate() >= birthDate.getUTCDate());

    if (!hasBirthdayPassed) {
      age -= 1;
    }

    return age;
  };

  const fetchBirthdays = async () => {
    const response = await fetchDataFromApi('/users', 'GET');
    const combineData: BirthdayObject[] = [];

    response.forEach((user: any) => {
      if (user.birthday !== '1955-01-01T00:00:00.000Z') {
        const age = getAge(user.birthday);

        combineData.push({
          id: user.id,
          name: user.name,
          surname: user.surname,
          birthday: extractDateAndTime(user.birthday).day,
          age: age,
          newAge: age + 1,
          userImage: {
            bgColor: user.userImage.bgColor,
            bgImage: user.userImage.bgImage,
            initials: user.userImage.initials,
            hideInitials: user.userImage.hideInitials,
          },
        });
      }
    });

    birthdayList.value = combineData;
  };

  const getNextBirthdays = async () => {
    await fetchBirthdays();

    const maxRenderingBirthdays = 4;
    const today = createTodaysDate();
    const [todayYear, todayMonth, todayDay] = splitDate(today);

    let nextBirthdays: BirthdayObject[] = [];
    let todaysBirthday: BirthdayObject[] = [];

    birthdayList.value.forEach((user) => {
      const [_, birthdayMonth, birthdayDay] = splitDate(user.birthday);

      if (birthdayMonth === todayMonth && birthdayDay === todayDay) {
        todaysBirthday.push({
          ...user,
          nextBirthday: new Date(
            todayMonth > birthdayMonth ||
            (todayMonth === birthdayMonth && todayDay > birthdayDay)
              ? todayYear + 1 // Geburtstag im nächsten Jahr
              : todayYear, // Geburtstag in diesem Jahr
            birthdayMonth - 1, // JS-Monate sind 0-basiert
            birthdayDay
          ),
        });
      }

      // Prüfen, ob der Geburtstag in diesem oder im nächsten Monat ist
      if (
        (birthdayMonth === todayMonth && birthdayDay > todayDay) || // Aktueller Monat, aber Geburtstag später im Monat
        birthdayMonth === (todayMonth % 12) + 1 // Nächster Monat (Wrap-around bei Dezember -> Januar)
      ) {
        nextBirthdays.push({
          ...user,
          nextBirthday: new Date(
            todayMonth > birthdayMonth ||
            (todayMonth === birthdayMonth && todayDay > birthdayDay)
              ? todayYear + 1 // Geburtstag im nächsten Jahr
              : todayYear, // Geburtstag in diesem Jahr
            birthdayMonth - 1, // JS-Monate sind 0-basiert
            birthdayDay
          ),
        });
      }
    });

    // Sortieren basierend auf dem berechneten `nextBirthday`
    nextBirthdays.sort((a, b) => {
      const aDate =
        a.nextBirthday instanceof Date ? a.nextBirthday.getTime() : 0;
      const bDate =
        b.nextBirthday instanceof Date ? b.nextBirthday.getTime() : 0;
      return aDate - bDate;
    });

    nextBirthdaysList.value = nextBirthdays.slice(0, maxRenderingBirthdays);
    todaysBirthdayList.value = todaysBirthday;
  };

  return {
    getNextBirthdays,
    nextBirthdaysList,
    todaysBirthdayList,
  };
};
