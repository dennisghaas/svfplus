<template>
  <ul class="blanklist practice-light">
    <li class="practice-light__item">
      <span>{{ textTruncate(name, 10) }} {{ textTruncate(surname, 10) }}</span>
    </li>
    <li v-for="item in list" :key="item.eventId" class="practice-light__item">
      <span
        class="practice-light__item-light"
        :style="{
          '--practice-light-bg': `var(${resolveResponse(item.response)})`,
        }"
      >
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Reaction } from '@/interface';
import { textTruncate } from '@/helpers/textTruncate.ts';

const resolveResponse = (response: string) => {
  if (response === 'Zusagen') {
    return '--success-light';
  } else if (response === 'Absagen') {
    return '--primary';
  } else {
    return '--gray-dark';
  }
};

defineProps({
  list: {
    type: Array as () => Reaction[],
    default: () => [] as Reaction[],
  },
  name: {
    type: String,
    default: '',
  },
  surname: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.practice-light {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: rem(10px);

  &__item {
    &:first-child {
      margin-right: auto;
      white-space: nowrap;
    }
  }

  span:not(.practice-light__item-light) {
    font-size: $font-size-14;
  }

  &__item-light {
    display: block;
    background: var(--practice-light-bg);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
}
</style>
