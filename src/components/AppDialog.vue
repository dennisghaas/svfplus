<template>
  <div v-if="open" class="app-dialog__wrapper">
    <div :class="['app-dialog', { 'app-dialog--alt': reactionLayout }]">
      <div class="app-dialog__header">
        <h2 v-if="!reactionLayout">
          {{ headline }}
        </h2>
        <button class="app-dialog__close" type="button" @click="closeDialog">
          <i class="icon-close"></i>
          <span class="d-none">Close</span>
        </button>
      </div>
      <div class="app-dialog__body">
        <slot name="DialogBody"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store'
const emit = defineEmits(['update:open'])

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  headline: {
    type: String,
    default: '',
  },
  reactionLayout: {
    type: Boolean,
    default: false,
  },
})

const closeDialog = () => {
  emit('update:open', false)
  store.updateOverflowHidden(false)
}
</script>

<style scoped lang="scss">
.app-dialog {
  background: var(--white);
  position: absolute;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  padding: 0 20px 40px;

  &--alt {
    padding: rem(40px) rem(20px);

    .app-dialog__close {
      top: rem(33px);
    }
  }

  @include media-breakpoint-up(lg) {
    box-shadow: $box-shadow-large;
    border-radius: rem(10px);
    max-height: rem(800px);
    height: auto;
    width: 75%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 rem(40px) rem(40px);

    &--alt {
      padding: rem(80px);
      height: auto;
      position: relative;
    }
  }

  @include media-breakpoint-up(xl) {
    width: 50%;
    height: auto;
    max-height: 75%;
  }

  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $overlayIndex;
    width: 100%;
    height: 100%;
    background: var(--black-50);
  }

  &__header {
    position: sticky;
    top: 0;
    left: 0;
    padding: rem(20px) 0 rem(20px);
    margin-bottom: rem(20px);
    border-bottom: 1px solid var(--border-color);
    background: var(--white);
    z-index: 4;

    h2, .h2 {
      padding-right: rem(35px);
    }

    @include media-breakpoint-up(lg) {
      padding: rem(40px) 0 rem(20px);

      h2, .h2 {
        padding-right: 0;
      }
    }

    .app-dialog--alt & {
      position: absolute;
      padding: 0;
      margin: 0;
      border: 0;
      right: 0;
      left: inherit;
    }
  }

  &__close {
    position: absolute;
    top: 1rem;
    padding: rem(14px);
    right: rem(-14px);
    transition: $transition-fast;

    @include media-breakpoint-up(lg) {
      top: rem(36px);
    }

    [class*='icon-'] {
      font-size: $font-size-21;
    }

    &:hover {
      color: var(--primary);
    }

    .app-dialog--alt & {
      top: rem(25px);
      right: rem(25px);
    }
  }
}
</style>
