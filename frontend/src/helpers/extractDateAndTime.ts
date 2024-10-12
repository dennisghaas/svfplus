export function extractDateAndTime(deadlineToStart: string) {
  const [day, time] = deadlineToStart.split('T')
  let formattedTime = null

  if (time) {
    const date = new Date(deadlineToStart)
    formattedTime = date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Berlin',
    })
  }

  return {
    day,
    formattedTime,
  }
}
