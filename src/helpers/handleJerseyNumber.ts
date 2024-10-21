export function handleJerseyNumber(jerseyNumber: number | null): number | null {
  if (jerseyNumber === 0 || jerseyNumber === undefined) {
    return 0
  } else {
    return jerseyNumber
  }
}
