<template>
  <span :class="['dot', `dot-${newRole}`, `dot--${additionalClass}`]"></span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  dot: {
    type: String,
    default: '',
  },
  additionalClass: {
    type: String,
    default: '',
  },
});

const newRole = ref('');
const resolveRole = () => {
  newRole.value = props.dot.replace(/[\[\]'\\]/g, '');
};

resolveRole();
</script>

<style scoped lang="scss">
.dot {
  width: rem(14px);
  height: rem(14px);
  display: inline-block;
  border-radius: 50%;
  background: var(--dot-background);
  border: 1px solid var(--white);

  &--wrapper {
    display: flex;
    gap: rem(5px);
  }

  &-trainer,
  &-co-trainer {
    --dot-background: var(--warning-light);
  }

  &-kassenwart {
    --dot-background: var(--success-mint);
  }

  &-spieler {
    --dot-background: var(--blue-primary);
  }

  &-mannschaftsrat {
    --dot-background: var(--purple);
  }

  &--card-member {
    margin-right: rem(-7px);
  }
}
</style>
