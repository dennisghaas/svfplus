<template>
  <fieldset>
    <label class="typo-label" :for="selectID">
      {{ selectTitle }}

      <template v-if="targetValue && countFilteredOptions >= 0 && !hideCount">
        „{{ targetValue }}“ ({{ countFilteredOptions }})
      </template>
    </label>

    <div class="select-wrapper">
      <select
        class="select"
        :name="selectName"
        :id="selectID"
        @change="emitSelection"
      >
        <option
          :value="selectPlaceholder"
          :selected="!disablePlaceholderVal"
          :disabled="disablePlaceholderVal"
        >
          {{ selectPlaceholder }}
        </option>
        <template v-for="option in selectOption" :key="option">
          <option :value="option">{{ option }}</option>
        </template>
      </select>

      <i class="icon-chevron-down"></i>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  selectID: {
    type: String,
    default: '',
  },
  selectName: {
    type: String,
    default: '',
  },
  selectOption: {
    type: Array,
    default: () => [],
  },
  selectPlaceholder: {
    type: String,
    default: '',
  },
  selectTitle: {
    type: String,
    default: '',
  },
  countFilteredOptions: {
    type: Number,
    default: 0,
  },
  hideCount: {
    type: Boolean,
    default: false,
  },
  disablePlaceholderVal: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:selection'])
const targetValue = ref('')

const emitSelection = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:selection', target.value)
  targetValue.value = target.value
}
</script>

<style scoped lang="scss">
@import '@/styles/components/select';
</style>
