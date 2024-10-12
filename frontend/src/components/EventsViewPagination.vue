<template>
  <div
    :class="[
      'events-view--pagination',
      { 'events-view--pagination__reverse': alignedTop },
    ]"
  >
    <button
      v-if="!hidePrevButton"
      class="events-view--pagination__control events-view--pagination__control--prev"
      type="button"
      @click="prevMonth()"
    >
      <i class="icon-chevron-left"></i>
      <span> Vorheriger Monat </span>
    </button>

    <button
      class="events-view--pagination__control events-view--pagination__control--next"
      type="button"
      @click="nextMonth()"
    >
      <i class="icon-chevron-right"></i>
      <span> Nächster Monat </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['updatePrevMonth', 'updateNextMonth'])

const prevMonth = () => {
  emit('updatePrevMonth')
}

const nextMonth = () => {
  emit('updateNextMonth')
}

defineProps({
  alignedTop: {
    type: Boolean,
    default: false,
  },
  hidePrevButton: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.events-view--pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(.events-view--pagination__reverse) {
    padding-bottom: rem(20px);
    margin-bottom: rem(20px);
    border-bottom: 1px solid var(--border-color);
  }

  &__control {
    display: flex;
    align-items: center;
    gap: rem(10px);

    &--next {
      flex-direction: row-reverse;
      margin-left: auto;
    }
  }

  &__reverse {
    padding-top: rem(20px);
    margin-top: rem(20px);
    border-top: 1px solid var(--border-color);
  }
}
</style>
