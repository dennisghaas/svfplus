<template>
  <fieldset>
    <label class="typo-label" :for="selectID">
      {{ selectTitle }}
      <template v-if="targetValue && countFilteredOptions >= 0 && !hideCount">
        „{{ targetValue }}“ ({{ countFilteredOptions }})
      </template>
    </label>

    <div :class="['select-wrapper', { 'select-wrapper--dark': themeDark }]">
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
        <template v-for="option in selectOption" :key="typeof option === 'string' ? option : option.id">
          <option v-if="!dynamicProperty" :value="option">
            {{ isOption(option) ? option[dynamicProperty] : option }}
          </option>
          <option v-else :value="isOption(option) ? option[dynamicProperty] : option">
            {{ isOption(option) ? option[dynamicProperty] : option }}
          </option>
        </template>
      </select>

      <i class="icon-chevron-down"></i>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Option} from "@/interface";

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
    type: Array as () => (Option | string)[],
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
  },
  themeDark: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:selection']);
const targetValue = ref('');

const emitSelection = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;

  let emitValue;

  if (!props.dynamicProperty) {
    emitValue = selectedValue;
  } else {
    const selectedOption = props.selectOption.find((option: string | Option) => {
      return isOption(option) ? option[props.dynamicProperty] === selectedValue : false;
    });

    emitValue = selectedOption ? selectedOption : selectedValue;
  }

  emit('update:selection', emitValue);
};


function isOption(option: string | Option): option is Option {
  return typeof option !== 'string';
}

</script>

<style scoped lang="scss">
@import '@/styles/components/select';
</style>