<template>
  <div class="app-dialog--event" v-if="!isLoading">
    <div class="app-dialog--event__header">
      <div class="body-text-b2">
        <p>Bearbeite alle wichtigen Informationen für dein Event</p>
      </div>
    </div>

    <AppDialogEventTraining
      v-if="eventType === 'Training'"
      :event-i-d="eventID"
      :event-type="eventType"
      :date="`${getDate?.year}-${getDate?.month}-${getDate?.day}`"
    />
    <AppDialogEventSpielFeier
      v-if="eventType === 'Spiel' || eventType === 'Feier'"
      :event-type="eventType"
      :event-i-d="eventID"
      :date="`${getDate?.year}-${getDate?.month}-${getDate?.day}`"
    />
    <AppDialogEventAbstimmung v-if="eventType === 'Abstimmung'" />

    <MetaInformation
      :author="selectedEvent[0].author"
      :created-at="`${createdAt?.day}.${createdAt?.month}.${createdAt?.year}`"
      :updated-at="`${updatedAt?.day}.${updatedAt?.month}.${updatedAt?.year}`"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useEvents } from '@/composables/useEvents.ts'
import { formatDate } from '@/helpers/formatDate.ts'
import { Event } from '@/interface'
import AppDialogEventTraining from '@/components/AppDialogEventTraining.vue'
import AppDialogEventAbstimmung from '@/components/AppDialogEventAbstimmung.vue'
import AppDialogEventSpielFeier from '@/components/AppDialogEventSpielFeier.vue'
import MetaInformation from '@/components/MetaInformation.vue'

// Define props
const props = defineProps({
  eventID: {
    type: Number,
    default: null,
  },
  eventType: {
    type: String,
    default: '',
  },
})

const { fetchEventsByID, selectedEvent } = useEvents()
const isLoading = ref(true)

const resolveDate = (eventValue: keyof Event) => {
  return computed(() => {
    if (selectedEvent.value && selectedEvent.value.length > 0) {
      const value = selectedEvent.value[0][eventValue]

      // Check if the value is a string or a Date before formatting
      if (value instanceof Date) {
        return formatDate(value)
      } else if (value === null) {
        return null
      }
      // Handle cases where the value is not a string or Date
      console.warn(`Unexpected type for eventValue: ${typeof value}`)
      return null // or some default value
    }
    return null
  })
}

const createdAt = resolveDate('createdAt')
const updatedAt = resolveDate('updatedAt')
const getDate = resolveDate('eventDate')

onMounted(async () => {
  try {
    await fetchEventsByID(props.eventID)
  } catch (error) {
    console.error('Error fetching event:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss"></style>
