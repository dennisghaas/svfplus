export function formatMonthToWord(
  month: string,
  isIndexNumbering?: boolean
): string {
  if (!isIndexNumbering) {
    const monthMap: { [key: string]: string } = {
      '01': 'Januar',
      '02': 'Februar',
      '03': 'März',
      '04': 'April',
      '05': 'Mai',
      '06': 'Juni',
      '07': 'Juli',
      '08': 'August',
      '09': 'September',
      '10': 'Oktober',
      '11': 'November',
      '12': 'Dezember',
    };
    return monthMap[month] || month;
  } else {
    const monthNumber = parseInt(month);
    const monthMap: { [key: number]: string } = {
      0: 'Januar',
      1: 'Februar',
      2: 'März',
      3: 'April',
      4: 'Mai',
      5: 'Juni',
      6: 'Juli',
      7: 'August',
      8: 'September',
      9: 'Oktober',
      10: 'November',
      11: 'Dezember',
    };
    return monthMap[monthNumber] || month; // Use monthNumber as the key
  }
}
