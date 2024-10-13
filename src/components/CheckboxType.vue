<template>
  <fieldset :class="['checkbox', { 'checkbox--no-border': noBorder }]">
    <input type="checkbox" :id="id" :checked="value" @change="onInput" />
    <label class="checkbox-label" :for="id">
      {{ label }}
    </label>
  </fieldset>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: Boolean,
    default: false,
  },
  noBorder: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/checkbox';
</style>
