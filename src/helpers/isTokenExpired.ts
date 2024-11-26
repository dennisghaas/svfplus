export function isTokenExpired(token: string | null) {
  try {
    if (token) {
      const payloadBase64 = token.split('.')[1]; // Extrahiere den Payload-Teil des JWT
      const payloadJson = atob(payloadBase64); // Dekodiere den Base64-String
      const payload = JSON.parse(payloadJson); // Parse den JSON-String

      // Prüfe, ob das Token abgelaufen ist
      return Date.now() >= payload.exp * 1000;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return true; // Betrachte das Token als abgelaufen, falls ein Fehler auftritt
  }
}
