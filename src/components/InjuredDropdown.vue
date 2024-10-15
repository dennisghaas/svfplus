<template>
  <CheckboxType
    :id="'is-injured'"
    :value="isInjuredVal"
    :label="'Verletzt?'"
    @update:model-value="updateIsInjured"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CheckboxType from '@/components/CheckboxType.vue'

const props = defineProps({
  isInjured: {
    type: Boolean,
    default: false,
  },
  throwError: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:is-injured'
])

const isInjuredVal = ref(props.isInjured)

watch(
  () => props.isInjured,
  (newValue) => {
    isInjuredVal.value = newValue
  },
)

const updateIsInjured = (injured: boolean) => {
  isInjuredVal.value = injured
  emit('update:is-injured', injured)
}
</script>

<style scoped lang="scss"></style>
