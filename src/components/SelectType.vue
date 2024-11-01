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
        <template v-for="option in selectOption" :key="option.id"> <!-- Assuming option has an id property -->
          <template v-if="!dynamicProperty">
            <option :value="option">{{ option }}</option>
          </template>
          <template v-else>
            <option :value="option[dynamicProperty]">
              {{ option[dynamicProperty] }}
            </option>
          </template>
        </template>
      </select>

      <i class="icon-chevron-down"></i>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
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
  dynamicProperty: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:selection']);
const targetValue = ref('');

const emitSelection = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value; // This is the value from the selected option

  let emitValue;

  if (!props.dynamicProperty) {
    // If dynamicProperty is not set, emit the selected option directly
    emitValue = selectedValue; // This will be the plain string value
  } else {
    // If dynamicProperty is set, find the selected option
    const selectedOption = props.selectOption.find(option => option[props.dynamicProperty] === selectedValue);

    // Check if the selectedOption is found
    if (selectedOption) {
      emitValue = selectedOption; // Emit the whole object
    } else {
      // If not found, emit a fallback value or the string itself
      emitValue = selectedValue; // This will emit the selected value if nothing matches
    }
  }

  emit('update:selection', emitValue);
};
</script>

<style scoped lang="scss">
@import '@/styles/components/select';
</style>