import { ref } from 'vue';

export function useWeeksInMonth(month: number, year: number) {
  const weeks = ref<string[][]>([]);

  function getMondayOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = (day === 0 ? 7 : day) - 1; // Derzeitige Berechnung
    const monday = new Date(date);
    monday.setDate(monday.getDate() - diff + 1); // Um einen Tag vorverschieben
    return monday;
  }

  function calculateWeeks() {
    const result: string[][] = [];
    let currentDate = new Date(year, month, 1); // Start des Monats
    let endDate = new Date(year, month + 1, 0); // Ende des Monats

    // Bestimme den Montag der ersten Woche im Monat
    currentDate = getMondayOfWeek(currentDate);

    // Schleife durch die Wochen bis zum Ende des Monats
    while (currentDate <= endDate) {
      const week: string[] = [];
      for (let i = 0; i < 7; i++) {
        const formattedString = currentDate.toISOString().split('T')[0];
        week.push(formattedString);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      result.push(week);

      // Beende die Schleife, wenn der Monat wechselt
      if (currentDate.getMonth() > month) {
        break;
      }
    }

    weeks.value = result;
  }

  return {
    weeks,
    calculateWeeks,
  };
}
