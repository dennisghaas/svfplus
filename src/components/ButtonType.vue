<template>
  <button
    v-if="typeButton && !typeSubmit"
    :disabled="disabled"
    :class="['btn', btnClass]"
    type="button"
    :title="btnText"
    @click="handleClick"
  >
    <i v-if="btnIcon" :class="btnIcon"></i>
    <span>{{ btnText }}</span>
  </button>

  <button
    v-if="!typeButton && typeSubmit"
    :disabled="disabled"
    :class="['btn', btnClass]"
    :title="btnText"
    type="submit"
  >
    <i v-if="btnIcon" :class="btnIcon"></i>
    <span>{{ btnText }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  typeSubmit: {
    type: Boolean,
    default: false,
  },
  typeButton: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  btnText: {
    type: String,
    default: 'Button',
  },
  btnClass: {
    type: [String, Array],
    default: '',
  },
  btnIcon: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  (event: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>

<style scoped lang="scss">
@import '@/styles/components/_button.scss';
</style>
