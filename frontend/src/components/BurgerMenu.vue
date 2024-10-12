<template>
  <button
    :class="['burger-menu', { active: active }]"
    type="button"
    @click="handleClick"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleDropdown'])

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})

function handleClick() {
  emit('toggleDropdown')
}
</script>

<style scoped lang="scss">
.burger-menu {
  /* make button more accessible */
  height: 100%;
  padding: 0 rem(10px);
  margin-right: rem(-10px);

  span {
    position: relative;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background: var(--black);
    display: block;
    margin: 3px 0;
    transition: $transition-base;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.active {
    span {
      &:first-child {
        transform: rotate(45deg);
        top: 5px;
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:last-child {
        transform: rotate(-45deg);
        top: -5px;
      }
    }
  }
}
</style>
