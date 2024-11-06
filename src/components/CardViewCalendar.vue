<template>
  <div class="card-view-calendar">
    <span class="card-view-calendar--day">
      {{ formatWeekday(weekday) }}
    </span>
    <span class="card-view-calendar--date">
      {{ day }}.{{ formatMonth(month) }}.
    </span>
  </div>
</template>

<script setup lang="ts">
import { formatWeekday } from '@/helpers/formatWeekday.ts';
import { formatMonth } from '@/helpers/formatMonth.ts';

defineProps({
  weekday: {
    type: String,
    default: '',
  },
  day: {
    type: String,
    default: '',
  },
  month: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.card-view-calendar {
  display: flex;
  flex-direction: column;
  width: rem(50px);
  height: rem(50px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: $box-shadow-default;

  &--day,
  &--date {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
  }

  &--day {
    font-size: $font-size-18;
    background: var(--primary);
    color: var(--white);
  }

  &--date {
    font-size: $font-size-12;
    background: var(--white);
    color: var(--black);
    font-weight: $font-weight-500;
  }
}
</style>
