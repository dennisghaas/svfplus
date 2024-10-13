import { VITE_APP_API } from '../config.ts'
const API_URL = `${VITE_APP_API}/api`

export const fetchDataFromApi = async (
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string,
): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const options: RequestInit = {
      method,
      headers,
    }

    if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_URL}${endpoint}`, options)

    // Check if response.ok is false
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Fehler beim Abrufen der Daten:', errorData)
      throw new Error(errorData || 'Netzwerkantwort war nicht okay.')
    }

    // Only return if successful
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error)
    throw error
  }
}
