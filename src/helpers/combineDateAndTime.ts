export function combineDateAndTime(
  deadlineToReactDay: Date,
  deadlineToReactTime: string | null
) {
  if (!deadlineToReactTime || !deadlineToReactDay) {
    return null;
  }

  const [hours, minutes] = deadlineToReactTime.split(':').map(Number);
  const combinedDate = new Date(deadlineToReactDay);
  combinedDate.setHours(hours, minutes, 0, 0);

  return combinedDate.toISOString();
}
