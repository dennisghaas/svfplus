<template>
  <CheckboxType
    :id="'is-injured'"
    :value="isInjuredVal"
    :label="'Verletzung eintragen'"
    @update:model-value="updateIsInjured"
    :no-border="isInjuredVal"
  />

  <template v-if="isInjuredVal">
    <div class="row">
      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'injured-type'"
          :label="'Grund'"
          :input-type="'text'"
          :input-placeholder="'Teile uns deine Verletzung mit'"
          v-model:model-value="injuredType"
          @update:model-value="updateIsInjuredType"
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'injured-until'"
          :label="'Ungefähr verletzt bis?'"
          :input-type="'date'"
          v-model:modelValue="injuredDate"
          @update:model-value="updateIsInjuredUntil"
        />
      </div>
    </div>

    <BadgeType
      v-if="throwError"
      :badge-type="'error'"
      :badge-text="'Das Enddatum darf nicht heute oder in der Vergangenheit liegen'"
    />
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CheckboxType from '@/components/CheckboxType.vue'
import InputType from '@/components/InputType.vue'
import BadgeType from '@/components/BadgeType.vue'

const props = defineProps({
  isInjured: {
    type: Boolean,
    default: false,
  },
  isInjuredUntil: {
    type: String,
    default: '',
  },
  isInjuredType: {
    type: String,
    default: '',
  },
  throwError: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:is-injured',
  'update:is-injured-type',
  'update:is-injured-until',
])

const isInjuredVal = ref(props.isInjured)

watch(
  () => props.isInjured,
  (newValue) => {
    isInjuredVal.value = newValue
  },
)

const injuredDate = ref(props.isInjuredUntil)
const injuredType = ref(props.isInjuredType)

const updateIsInjured = (injured: boolean) => {
  isInjuredVal.value = injured
  emit('update:is-injured', injured)
}

const updateIsInjuredType = (value: string | number | Date) => {
  if (typeof value === 'string') {
    injuredType.value = value // Assuming injuredType is a ref
  } else {
    console.warn('Unexpected type for injured type:', typeof value)
  }
}

const updateIsInjuredUntil = (newDate: string | number | Date) => {
  let dateString: string

  // Convert newDate to a string if it's a Date or number
  if (typeof newDate === 'string') {
    dateString = newDate
  } else if (newDate instanceof Date) {
    dateString = newDate.toISOString().split('T')[0] // Format to 'YYYY-MM-DD'
  } else {
    console.warn('Unexpected type for injured until date:', typeof newDate)
    return // Exit if the type is unexpected
  }

  // Parse and validate the date
  const parsedDate = new Date(dateString)
  if (!isNaN(parsedDate.getTime())) {
    injuredDate.value = dateString // Store the valid date
    emit('update:is-injured-until', dateString) // Emit the valid date
  } else {
    console.warn('Ungültiges Datum:', dateString) // Warn if the date is invalid
  }
}

watch(
  () => props.isInjuredUntil,
  (newValue) => {
    injuredDate.value = newValue
  },
)
</script>

<style scoped lang="scss"></style>
