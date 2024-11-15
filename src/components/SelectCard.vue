<template>
  <div class="select-card">
    <header
      class="select-card__header"
      :style="{ '--select-card-icon-color': `var(${iconColor})` }"
    >
      <i v-if="icon" :class="icon"></i>
      <h2>
        {{ title }}
      </h2>
    </header>

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
  icon: {
    type: String,
    default: '',
  },
  iconColor: {
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

  &__header {
    margin-bottom: rem(10px);
    display: flex;
    flex-direction: column;
    align-items: center;

    [class*='icon-'] {
      margin-bottom: rem(5px);
      font-size: $font-size-28;
      color: var(--select-card-icon-color);
    }
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

    &__header {
      [class*='icon-'] {
        margin-bottom: rem(10px);
        font-size: $font-size-34;
      }
    }

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
