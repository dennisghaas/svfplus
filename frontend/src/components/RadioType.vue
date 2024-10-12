<template>
  <fieldset class="radio">
    <template
      v-for="item in radio"
      :key="staticDataRadio ? item.id : `${item.text}_${id}`"
    >
      <label
        :for="staticDataRadio ? item.id : `${item.text}_${id}`.toLowerCase()"
        class="radio-label"
      >
        {{ staticDataRadio ? item.label : item.text }}
      </label>
      <input
        type="radio"
        :id="staticDataRadio ? item.id : `${item.text}_${id}`.toLowerCase()"
        :name="name"
        :value="staticDataRadio ? item.label : item.text"
        :checked="staticDataRadio ? item.checked : false"
        @input="onInput"
      />
    </template>
  </fieldset>
</template>

<script setup lang="ts">
import { RadioItem } from '@/interface'

defineProps({
  name: {
    type: String,
    default: '',
  },
  radio: {
    type: Array as () => RadioItem[],
    default: () => [],
  },
  staticDataRadio: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
