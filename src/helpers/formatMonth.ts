export function formatMonth(month: string): string {
  const monthMap: { [key: string]: string } = {
    Januar: '01',
    Februar: '02',
    März: '03',
    April: '04',
    Mai: '05',
    Juni: '06',
    Juli: '07',
    August: '08',
    September: '09',
    Oktober: '10',
    November: '11',
    Dezember: '12',
  };

  return monthMap[month] || month;
}
