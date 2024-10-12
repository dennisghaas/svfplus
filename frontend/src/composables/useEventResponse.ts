import { ref } from 'vue'
import { fetchDataFromApi } from '../helpers/fetchDataFromApi.ts'
import store from '../store'
import { Reaction, EventResponse } from '../interface'

const userResponses = ref<Map<number, Reaction | null>>(new Map())
const selectEventResponses = ref<EventResponse[]>([])

export const useEventResponse = () => {
  const eventResponse = async (
    reaction: string,
    eventID: number,
    reason: string,
    router: any,
    isNotCurrentUser?: boolean,
    id?: number,
  ) => {
    let userID: number | undefined = 0

    if (!isNotCurrentUser) {
      userID = store.state.userData.id
    } else {
      userID = id
    }

    try {
      const response = await fetchDataFromApi('/event-responses', 'POST', {
        userId: userID,
        eventId: eventID,
        response: reaction,
        reason: reason,
      })
      router.go() // This refreshes the page after the API call
      return response
    } catch (error) {
      console.error('Error submitting response:', error)
      throw new Error('Failed to submit event response')
    }
  }

  const fetchUserResponseToEvent = async (eventID: number) => {
    const userID = store.state.userData.id
    try {
      const response = await fetchDataFromApi(
        `/event-responses/${userID}/${eventID}`,
        'GET',
      )
      if (response !== null) {
        userResponses.value.set(eventID, response)
      } else {
        userResponses.value.set(eventID, null)
      }
    } catch (error) {
      console.error('Error fetching user response:', error)
      userResponses.value.set(eventID, null)
      throw new Error('Failed to fetch user response')
    }
  }

  const fetchEventResponse = async (eventID: number) => {
    try {
      const response = await fetchDataFromApi(
        `/event-responses/events/${eventID}/responses`,
        'GET',
      )
      selectEventResponses.value = response
    } catch (error: any) {
      if (error.message.includes('No responses found for this event')) {
        console.warn('No responses found, setting an empty response list')
        selectEventResponses.value = []
      } else {
        console.error('geht nicht', error)
      }
    }
  }

  const deleteEventResponseByID = async (eventID: number) => {
    try {
      const response = await fetchDataFromApi(
        `/event-responses/events/${eventID}/responses`,
        'DELETE',
      )
      console.log(
        `Reaktionen auf Event ${eventID} wurden gelöscht. Nachricht: ${response.message}`,
      )
      return response
    } catch (error) {
      console.error(
        'Reaktionen des Events konnten nicht gelöscht werden.',
        error,
      )
    }
  }

  const getResponseForEvent = (eventID: number): Reaction | null => {
    return userResponses.value.get(eventID) ?? null
  }

  return {
    eventResponse,
    fetchUserResponseToEvent,
    fetchEventResponse,
    getResponseForEvent,
    deleteEventResponseByID,
    selectEventResponses,
  }
}
