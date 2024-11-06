export function createGenetiveFromName(name: string) {
  const lastLetter = name.slice(-1);
  if (lastLetter === 's') {
    return name;
  } else {
    return name + 's';
  }
}
