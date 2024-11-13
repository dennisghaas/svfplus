export function replaceSpaceWithDash(input: string) {
  input = input.replace(/\s+/g, '-');

  return input;
}
