<template>
  <div class="select-card">
    <h2>
      {{ title }}
    </h2>

    <div class="body-text-b2 text-color-black-75" v-html="bodyText" />

    <button
      class="select-card__button"
      type="button"
      @click="handleOpenSelectedOption"
    >
      <span class="d-none">Wähle {{ title }} aus</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['openSelectedOption']);

const handleOpenSelectedOption = () => {
  emits('openSelectedOption');
};

defineProps({
  title: {
    type: String,
    default: '',
  },
  bodyText: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.select-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: rem(40px);
  margin: rem(10px) 0 rem(20px);
  border-radius: rem(10px);
  box-shadow: $box-shadow-large;
  background: var(--white);
  height: calc(100% - #{rem(30px)});
  text-align: center;

  h2,
  .h2 {
    margin-bottom: rem(10px);
  }

  &__button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @include media-breakpoint-up(lg) {
    transition: $transition-base;

    [class*='body-text-'] {
      width: 75%;
      margin: 0 auto;
    }

    &:hover {
      transform: scale(1.025);
    }
  }
}
</style>
