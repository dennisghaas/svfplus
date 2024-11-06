export function formatToISO(dateData: string | Date): string {
  const date = new Date(dateData);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date provided:', dateData);
    return '';
  }

  return date.toISOString();
}
