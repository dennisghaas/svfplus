export function formatDate(dateData: string | Date | null | undefined) {
  if (
    !dateData ||
    (typeof dateData !== 'string' && !(dateData instanceof Date))
  ) {
    console.error('Invalid or missing date provided:', dateData);
    return {
      day: '',
      month: '',
      year: '',
      weekday: '',
    };
  }

  const date = new Date(dateData);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date provided:', dateData);
    return {
      day: '',
      month: '',
      year: '',
      weekday: '',
    };
  }

  const dayValue = date.getDate().toString().padStart(2, '0');
  const monthValue = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearValue = date.getFullYear().toString();
  const weekdayValue = date.toLocaleDateString('de-DE', { weekday: 'long' });

  return {
    day: dayValue,
    month: monthValue,
    year: yearValue,
    weekday: weekdayValue,
  };
}
