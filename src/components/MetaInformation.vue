<template>
  <ul class="meta-data blanklist">
    <li v-if="author" class="meta-data__author">
      <strong>Autor</strong>
      {{ author }}
    </li>
    <li>
      <strong>Erstellt am</strong>
      {{ createdAt }}
    </li>
    <li>
      <strong>Zuletzt bearbeitet am</strong>
      {{ updatedAt }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps({
  createdAt: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.meta-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: rem(30px);
  gap: 1rem;

  li {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    padding-right: 1rem;
    position: relative;

    &::after {
      content: '';
      width: 4px;
      height: 4px;
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -2px;
      border-radius: 50%;
      background: var(--primary);
    }

    &:last-child {
      padding-right: 0;

      &::after {
        display: none;
      }
    }
  }

  @include media-breakpoint-up(lg) {
  }

  &__author {
    text-transform: capitalize;
  }
}
</style>
