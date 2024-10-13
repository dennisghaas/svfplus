export function validateMail(mail: string): boolean {
  // Regular expression for validating an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Test the input against the regex
  return emailRegex.test(mail)
}
