<template>
  <div v-if="open" class="warning-dialog">
    <div class="warning-dialog__inner">
      <div class="warning-dialog__header">
        <i class="icon-warning"></i>
        <h2>{{ headline }}</h2>
      </div>
      <div class="warning-dialog__body">
        <slot name="DialogBody"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  headline: {
    type: String,
    default: '',
  },
  open: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.warning-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $overlayIndex;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--white-75);
  }

  &__inner {
    z-index: 2;
    background: var(--white);
    padding: rem(20px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - #{$gutter-width * 4});
    box-shadow: $box-shadow-large;
    border-radius: rem(20px);
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: rem(10px);

    [class*='icon-'] {
      font-size: $font-size-24;
      margin-bottom: rem(5px);
      color: var(--warning-light);
    }
  }

  &__body {
    text-align: center;
  }
}
</style>

<style lang="scss">
.warning-dialog {
  &__body {
    .button-wrapper {
      margin-top: rem(30px);
    }
  }
}
</style>
