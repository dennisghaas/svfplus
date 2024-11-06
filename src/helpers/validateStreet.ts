export function validateStreet(street: string): boolean {
  // 1. Check if the street is long enough (e.g., at least 3 characters)
  if (street.length < 3) {
    return false;
  }

  // 2. Check if the street contains at least one digit (e.g., for house number)
  const containsNumber = /\d/.test(street);
  if (!containsNumber) {
    return false;
  }

  // 3. Allow letters, numbers, spaces, hyphens, and German-specific characters
  const validPattern = /^[a-zA-ZäöüÄÖÜß\s\d-]+$/;
  if (!validPattern.test(street)) {
    return false;
  }

  // If all checks pass, return true
  return true;
}
