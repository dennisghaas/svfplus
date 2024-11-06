<template>
  <div class="app-button">
    <button type="button" :title="label" :class="additionalClass">
      <i :class="icon"></i>
    </button>
    <span v-if="showLabel" class="text-center">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showLabel: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  additionalClass: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.app-button {
  max-width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(50px);
    height: rem(50px);
    border-radius: rem(10px);
    box-shadow: $box-shadow-default;
  }

  span {
    margin-top: rem(5px);
    font-size: $font-size-10;
    color: var(--white-75);
  }

  [class*='icon-'] {
    font-size: $font-size-21;
  }
}
</style>
