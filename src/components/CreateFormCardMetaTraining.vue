<template>
  <InputType
    :id="'start-date'"
    :label="'Dauerauftrag von'"
    :input-type="'date'"
    v-model:modelValue="formattedStartDate"
  />

  <SelectType
    :select-title="'Wiederholt sich jeden'"
    :select-option="accessibleWeekday"
    :select-placeholder="'Wochentag auswählen'"
    :hide-count="true"
    :disable-placeholder-val="true"
    :select-i-d="'repeat-weekday'"
    @update:selection="handleTargetDay"
  />

  <InputType
    :id="'end-date'"
    :label="'Dauerauftrag bis'"
    :input-type="'date'"
    v-model:modelValue="formattedEndDate"
    :error-message="
      errorInvalidDate ? 'Start- und Enddatum dürfen nicht identisch sein' : ''
    "
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useStandingOrder } from '@/composables/useStandingOrder.ts'
import { useEvents } from '@/composables/useEvents.ts'
import { accessibleWeekday } from '@/config'
import SelectType from '@/components/SelectType.vue'
import InputType from '@/components/InputType.vue'

/* STANDING ORDER FUNCTION */
const {
  startDate,
  endDate,
  targetDay,
  formattedStartDate,
  formattedEndDate,
  calculateStandingOrderDates,
} = useStandingOrder()
const standingOrderDates = ref<string[]>([])

const { trainingStandingOrderObject } = useEvents()

const generateStandingOrderDates = () => {
  startDate.value = new Date(formattedStartDate.value)
  endDate.value = new Date(formattedEndDate.value)

  try {
    standingOrderDates.value = calculateStandingOrderDates()
  } catch (error) {
    console.error('Error during date calculation:', error)
  }
}

const emit = defineEmits(['updateFormattedStartDate', 'updateFormattedEndDate'])

watch(
  [formattedStartDate, formattedEndDate, targetDay],
  (newValues, oldValues) => {
    if (newValues !== oldValues) {
      startDate.value = new Date(formattedStartDate.value)
      endDate.value = new Date(formattedEndDate.value)

      if (startDate.value && endDate.value && targetDay.value !== null) {
        generateStandingOrderDates()
        trainingStandingOrderObject.value = standingOrderDates.value

        emit('updateFormattedStartDate', startDate.value)
        emit('updateFormattedEndDate', endDate.value)
      }
    }
  },
)

const handleTargetDay = (weekday: string) => {
  const dayMap: { [key: string]: number } = {
    Sonntag: 0,
    Montag: 1,
    Dienstag: 2,
    Mittwoch: 3,
    Donnerstag: 4,
    Freitag: 5,
    Samstag: 6,
  }

  targetDay.value = dayMap[weekday] ?? 0
}

defineProps({
  errorInvalidDate: {
    type: Boolean,
    default: true,
  },
})

onMounted(() => {
  targetDay.value = 1
})
</script>

<style scoped lang="scss"></style>
