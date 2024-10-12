export function validatePostalCode(postalCode: string): boolean {
  const pattern = /^\d{5}\s+.+$/
  return pattern.test(postalCode)
}
