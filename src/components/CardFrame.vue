<template>
  <div
    :class="[
      'card bg-white',
      {
        'card--alt': cardLayoutAlt,
        'card--overlay': cardOverlay,
        'card--preview': isPreview,
      },
    ]"
  >
    <div :class="['card--header', cardHeaderBG]">
      <div class="card--header__left d-flex">
        <slot name="cardHeaderLeft"></slot>
      </div>
      <div
        v-if="!hideHeaderRight"
        :class="[
          'card--header__right d-flex',
          { 'card--header__no-calendar': noCalendar },
        ]"
      >
        <slot name="cardHeaderRight"></slot>
      </div>
    </div>
    <div
      v-if="!hideCardBody"
      :class="[
        'card--body',
        cardBodyBG,
        textColorDefault ? 'text-color-black' : 'text-color-white',
      ]"
    >
      <slot name="cardBody"></slot>
    </div>
    <slot name="cardModal"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  cardHeaderBG: {
    type: String,
    default: 'bg-blue-soft-gray',
  },
  cardBodyBG: {
    type: String,
    default: 'bg-white',
  },
  textColorDefault: {
    type: Boolean,
    default: true,
  },
  hideCardBody: {
    type: Boolean,
    default: false,
  },
  cardLayoutAlt: {
    type: Boolean,
    default: false,
  },
  cardOverlay: {
    type: Boolean,
    default: false,
  },
  noCalendar: {
    type: Boolean,
    default: false,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
  hideHeaderRight: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.card {
  position: relative;
  border-radius: rem(10px);
  overflow: hidden;
  margin-bottom: $gutter-width * 2;

  &--header {
    display: flex;
    position: relative;
    padding: rem(10px) rem(20px);
    color: var(--white);

    &__left {
      flex-direction: column;
      width: 100%;
      margin-right: rem(10px);
    }

    &__right {
      align-items: center;
      justify-content: flex-end;
      flex-direction: row;
      gap: rem(10px);
    }

    &__no-calendar {
      flex: none;
    }
  }

  &--body {
    position: relative;
    padding: rem(15px) rem(20px);
    hyphens: auto;
    text-wrap: pretty;
  }

  &--alt {
    @include media-breakpoint-up(lg) {
      .card--header {
        padding: rem(20px) rem(40px);
      }

      .card--body {
        padding: rem(40px);
      }
    }
  }

  &--preview {
    box-shadow: $box-shadow-large;
  }

  &--overlay {
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: var(--white-75);
      z-index: 1;
    }
  }
}
</style>

<style lang="scss">
.card--header__left--birthday {
  display: flex;
  align-items: center;
  gap: rem(10px);
}
</style>
