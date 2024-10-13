export function resolveRole(role: string): string {
  // Remove brackets, quotes (single and double), slashes, and split the string into an array
  const rolesArray = role
    .replace(/[\[\]'"\\"\\]/g, '') // Remove square brackets, quotes (single/double), and backslashes
    .split(',')
    .map((r) => r.trim())

  // If there's only one role, return it directly
  if (rolesArray.length === 1) {
    return rolesArray[0]
  }

  // If there are multiple roles, join them with " und " before the last role
  return (
    rolesArray.slice(0, -1).join(', ') +
    ' und ' +
    rolesArray[rolesArray.length - 1]
  )
}
