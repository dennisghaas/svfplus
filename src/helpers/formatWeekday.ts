export function formatWeekday(weekday: string): string {
  const weekdayMap: { [key: string]: string } = {
    Montag: 'Mo.',
    Dienstag: 'Di.',
    Mittwoch: 'Mi.',
    Donnerstag: 'Do.',
    Freitag: 'Fr.',
    Samstag: 'Sa.',
    Sonntag: 'So.',
  };

  return weekdayMap[weekday] || weekday;
}
