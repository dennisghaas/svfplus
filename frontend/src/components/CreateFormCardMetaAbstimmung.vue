<template>
  <InputType
    :id="'vote-question'"
    :label="'Frage'"
    :input-type="'text'"
    :input-placeholder="'Stelle eine Frage'"
    v-model:modelValue="voteQuestion"
    :error-message="voteQuestionError ? 'Du musst eine Frage einstellen' : ''"
  />

  <VoteOptions
    v-model:answers="voteOptions"
    :error-message="
      voteOptionsError
        ? 'Es müssen mindestens zwei Antwortmöglichkeiten bereitgestellt werden'
        : ''
    "
  />

  <CheckboxType
    :label="'Mehrere Antworten erlauben'"
    :id="'checkbox-for-multiple-answer-selection'"
    :value="voteMultipleSelection"
    @update:model-value="updateMultipleSelection"
  />

  {{ voteMultipleSelection }}
</template>

<script setup lang="ts">
import { useEvents } from '@/composables/useEvents.ts'
import InputType from '@/components/InputType.vue'
import VoteOptions from '@/components/VoteOptions.vue'
import CheckboxType from '@/components/CheckboxType.vue'

const { voteOptions, voteQuestion, voteMultipleSelection } = useEvents()

/* CHECKBOX: ENABLE OR DISABLE MULTIPLE ANSWER OPTION FOR QUESTIONS */
const updateMultipleSelection = (multiAnswer: boolean) => {
  voteMultipleSelection.value = multiAnswer
}

defineProps({
  voteQuestionError: {
    type: Boolean,
    default: false,
  },
  voteOptionsError: {
    type: Boolean,
    default: false,
  },
})
</script>
