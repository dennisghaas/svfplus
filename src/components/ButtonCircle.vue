<template>
  <button
    :class="['btn-circle', { active: name === apiResponse }]"
    class="btn-circle"
    type="button"
    :title="generateTitle()"
    :style="{ '--btn-circle-background': `var(${background})` }"
    @click="$emit('click')"
  >
    <i :class="icon"></i>
    <span class="visually-hidden">
      {{ name }}
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  reaction: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '',
  },
  apiResponse: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const generateTitle = () => {
  if (props.reaction !== 'Unsicher') {
    return `Für ${props.username} ${props.reaction.toLowerCase()}`;
  } else {
    return `${props.username} ist sich noch ${props.reaction.toLowerCase()}`;
  }
};
</script>

<style scoped lang="scss">
.btn-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: rem(36px);
  height: rem(36px);
  border-radius: 50%;
  color: var(--white);
  background: var(--border-color);

  &.active {
    background: var(--btn-circle-background);
  }
}
</style>
