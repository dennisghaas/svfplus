<template>
  <div class="create-form-card--inner">
    <SelectType
      :select-title="'Wähle ein Event'"
      :select-option="accessibleEventTypes"
      :select-placeholder="'Event auswählen'"
      :hide-count="true"
      :disable-placeholder-val="true"
      :select-i-d="'select-event'"
      @update:selection="handleSelection"
    />

    <template v-if="eventType === 'Training'">
      <CreateFormCardMetaTraining
        :error-invalid-date="standingOrderError"
        @update-formatted-start-date="handleStartDate"
        @update-formatted-end-date="handleEndDate"
      />
    </template>

    <template v-if="eventType === 'Spiel'">
      <CreateFormCardMetaSpiel
        :venue-street-error="venueStreetError"
        :venue-postal-code-error="venuePostalCodeError"
        :link-extern-error="linkExternError"
      />
    </template>

    <template v-if="eventType === 'Feier'">
      <CreateFormCardMetaFeier
        :venue-street-error="venueStreetError"
        :venue-postal-code-error="venuePostalCodeError"
      />
    </template>

    <template v-if="eventType === 'Abstimmung'">
      <CreateFormCardMetaAbstimmung
        :vote-question-error="voteQuestionError"
        :vote-options-error="voteOptionsError"
      />
    </template>

    <CreateFormNextButton
      :nextID="'desc'"
      :btnText="'Weiter zu Beschreibung'"
      :btn-class="'w-100'"
      @click="validateForm('desc')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEvents } from '@/composables/useEvents.ts'
import { useHandleNextCreateForm } from '@/composables/useHandleNextCreateForm.ts'
import { validatePostalCode } from '@/helpers/validatePostalCode.ts'
import { validateFussballDeLink } from '@/helpers/validateFussballDeLink.ts'
import { validateStreet } from '@/helpers/validateStreet.ts'
import { accessibleEventTypes } from '@/config.ts'
import CreateFormNextButton from '@/components/CreateFormNextButton.vue'
import SelectType from '@/components/SelectType.vue'
import CreateFormCardMetaTraining from '@/components/CreateFormCardMetaTraining.vue'
import CreateFormCardMetaSpiel from '@/components/CreateFormCardMetaSpiel.vue'
import CreateFormCardMetaFeier from '@/components/CreateFormCardMetaFeier.vue'
import CreateFormCardMetaAbstimmung from '@/components/CreateFormCardMetaAbstimmung.vue'

const formattedStartDate = ref(new Date())
const formattedEndDate = ref(new Date())

const handleStartDate = (startDate: Date) => {
  formattedStartDate.value = startDate
}

const handleEndDate = (endDate: Date) => {
  formattedEndDate.value = endDate
}

watch([formattedStartDate, formattedEndDate], () => {
  standingOrderError.value =
    formattedStartDate.value.getTime() === formattedEndDate.value.getTime()
})

/* HANDLE FORM VALIDATION */
const { handleNextForm } = useHandleNextCreateForm()

const venueStreetError = ref(false)
const venuePostalCodeError = ref(false)
const linkExternError = ref(false)
const voteQuestionError = ref(false)
const voteOptionsError = ref(false)
const standingOrderError = ref(false)

const validateForm = (nextID: string) => {
  if (eventType.value === 'Spiel') {
    if (venueStreet.value || venuePostalCode.value) {
      if (venueStreet.value && !venuePostalCode.value) {
        venuePostalCodeError.value = true
      } else if (venuePostalCode.value && !venueStreet.value) {
        venueStreetError.value = true
      } else {
        venueStreetError.value = !validateStreet(venueStreet.value)
        venuePostalCodeError.value = !validatePostalCode(venuePostalCode.value)
      }
    } else {
      venueStreetError.value = false
      venuePostalCodeError.value = false
    }

    if (linkExtern.value) {
      linkExternError.value = !validateFussballDeLink(linkExtern.value)
    } else {
      linkExternError.value = false
    }

    if (
      !venueStreetError.value &&
      !venuePostalCodeError.value &&
      !linkExternError.value
    ) {
      handleNextForm(nextID)
    }
  }

  if (eventType.value === 'Feier') {
    venueStreetError.value = venueStreet.value.length <= 0
    venuePostalCodeError.value = venuePostalCode.value.length <= 0

    if (!venueStreetError.value && !venuePostalCodeError.value) {
      handleNextForm(nextID)
    }
  }

  if (eventType.value === 'Abstimmung') {
    voteQuestionError.value = voteQuestion.value.length <= 0
    voteOptionsError.value = voteOptions.value.some(
      (answer) => answer.text.length <= 0,
    )

    if (!voteQuestionError.value && !voteOptionsError.value) {
      handleNextForm(nextID)
    }
  }

  if (eventType.value === 'Training') {
    standingOrderError.value =
      formattedStartDate.value.getTime() === formattedEndDate.value.getTime()

    if (!standingOrderError.value) {
      handleNextForm(nextID)
    }
  }
}

/* SELECT EVENT */
const updatedValue = ref('Training')
const handleSelection = (selectedValue: string) => {
  updatedValue.value = selectedValue

  /* Adjust ref for useEvents function */
  eventType.value = selectedValue
}

/* POST DATA TO SERVER */
const {
  eventType,
  venueStreet,
  venuePostalCode,
  linkExtern,
  voteOptions,
  voteQuestion,
} = useEvents()
</script>

<style scoped lang="scss">
@import '@/styles/components/create-form';
</style>
