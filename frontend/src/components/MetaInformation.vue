<template>
  <ul class="meta-data blanklist">
    <li v-if="author" class="meta-data--author">
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
})
</script>

<style scoped lang="scss">
.meta-data {
  margin-top: rem(30px);
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    margin-right: rem(20px);
    padding-right: rem(20px);
    position: relative;

    &::after {
      content: '';
      width: rem(4px);
      height: rem(4px);
      background: var(--primary);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: rem(-2px);
      border-radius: 50%;
    }

    &:last-child {
      margin-right: 0;
      padding-right: 0;

      &::after {
        display: none;
      }
    }
  }

  &--author {
    text-transform: capitalize;
  }
}
</style>
