export function validateFussballDeLink(url: string): boolean {
  try {
    // Versuche, eine URL-Instanz zu erstellen. Wenn dies fehlschlägt, ist es keine gültige URL.
    const parsedUrl = new URL(url);

    // Überprüfe, ob der Hostname "fussball.de" ist.
    return (
      parsedUrl.hostname === 'www.fussball.de' ||
      parsedUrl.hostname === 'fussball.de'
    );
  } catch (e) {
    // Wenn die URL-Instanzierung fehlschlägt, ist es kein gültiger Link.
    return false;
  }
}
