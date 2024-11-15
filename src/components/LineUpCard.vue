<template>
  <div class="lineup__card">
    <h3>
      {{ headline }}
    </h3>

    <div v-if="bodyText" class="body-text-b2">
      <p v-html="bodyText" />
    </div>

    <template v-if="layoutDefault">
      <slot name="layoutDefaultContent"></slot>
    </template>

    <div v-else class="lineup__card-games">
      <ul class="blanklist">
        <li
          class="lineup__card-games_item"
          v-for="game in games"
          :key="game.id"
        >
          <h4>
            {{ game.eventDescription.title }}
          </h4>
          <div class="body-text-b3">
            <p class="text-color-white-75">
              {{ game.eventDescription.subtitle }}
            </p>
          </div>

          <button type="button" @click="handleEventClick(game)">
            <i class="icon-chevron-right"></i>
            <span class="d-none">Öffne diese Event</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Event } from '@/interface';

const emits = defineEmits(['event-click']);

const handleEventClick = (game: Event) => {
  emits('event-click', game);
};

defineProps({
  headline: {
    type: String,
    default: '',
  },
  bodyText: {
    type: String,
    default: '',
  },
  games: {
    type: Array as () => Event[],
    default: () => [] as Event[],
  },
  layoutDefault: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss">
.lineup__card {
  display: flex;
  flex-direction: column;
  height: calc(100% - #{rem(20px)});
  background: var(--white);
  padding: rem(20px);
  border-radius: rem(10px);
  margin-bottom: rem(20px);

  h3,
  .h3 {
    margin-bottom: rem(10px);
  }

  .body-text-b2 {
    margin-bottom: rem(30px);
  }

  &-games {
    margin-top: rem(30px);

    &_item {
      display: flex;
      flex-direction: column;
      background: var(--blue-soft-gray);
      color: var(--white);
      border-radius: rem(10px);
      margin-bottom: rem(10px);
      padding: rem(10px) rem(20px);
      position: relative;

      button {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: rem(20px);
      }
    }
  }
}
</style>

<style lang="scss">
.lineup__card {
  .btn {
    margin-top: auto;
  }
}
</style>
