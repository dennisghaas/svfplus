<template>
  <fieldset>
    <label v-if="id" :for="id" class="typo-label">
      {{ label }}
    </label>

    <textarea
      class="textarea"
      :id="id"
      :name="id"
      :rows="rows"
      :cols="cols"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      ref="textarea"
    ></textarea>

    <span
      v-if="errorMessage"
      v-html="errorMessage"
      class="text-color-primary"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  id?: string
  label?: string
  modelValue?: string
  placeholder?: string
  rows?: number
  cols?: number
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const textarea = ref<HTMLTextAreaElement | null>(null)

const adjustTextareaHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  adjustTextareaHeight()
}

onMounted(() => {
  adjustTextareaHeight()
})

watch(
  () => props.modelValue,
  () => {
    adjustTextareaHeight()
  },
)
</script>

<style scoped lang="scss">
fieldset {
  position: relative;
  margin-bottom: rem(20px);

  span {
    margin-top: rem(5px);
    display: block;
    font-size: $font-size-12;
  }
}

.textarea {
  display: flex;
  border: 1px solid var(--border-color);
  resize: none;
  padding: rem(15px) rem(40px);
  width: 100%;
  min-height: rem(100px);
  border-radius: rem(10px);

  &:focus-visible {
    outline: 0;
    border-color: var(--primary);
    box-shadow: 0 0 rem(6px) var(--primary-50);
  }

  &::placeholder {
    color: var(--black-50);
  }
}
</style>
