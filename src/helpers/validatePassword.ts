export function validatePassword(
  password: string,
  repeatPassword: string,
): boolean {
  // Check if passwords match
  if (password !== repeatPassword) {
    return false
  }

  // Regex for validating password complexity
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  // Check if the password meets complexity requirements
  return passwordRegex.test(password)
}
