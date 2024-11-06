export function subtractHours(time: string, subtractValue: number): string {
  const [hours, minutes] = time.split(':').map(Number);
  let newHours = hours - subtractValue;

  if (newHours < 0) {
    newHours = 23;
  }

  const newHoursStr = newHours.toString().padStart(2, '0');
  return `${newHoursStr}:${minutes.toString().padStart(2, '0')}`;
}
