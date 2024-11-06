<template>
  <ButtonType
    :type-button="true"
    :btn-class="btnClass"
    :btn-text="btnText"
    :disabled="disabled"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import ButtonType from '@/components/ButtonType.vue';

const props = defineProps({
  nextID: {
    type: String,
    default: '',
  },
  btnClass: {
    type: String,
    default: '',
  },
  btnText: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<style scoped lang="scss"></style>
