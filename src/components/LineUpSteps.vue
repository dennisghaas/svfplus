<template>
  <nav class="lineup__step-navigation">
    <ul class="blanklist">
      <template v-for="(step, index) in steps" :key="index">
        <li
            :class="['lineup__step-navigation__item', {
            'lineup__step-navigation__item--active' : activeStep === index || activeStep > index,
            'lineup__step-navigation__item--disabled' : activeStep < index
          }]"
        >
          <button type="button" @click="handleChangeStep(index, activeStep < index)">
            <i :class="activeStep === index || activeStep > index ? 'icon-check' : 'icon-close'"></i>
            <span>{{ step.name }}</span>
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  steps: {
    type: Array,
    default: () => []
  },
  activeStep: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['changeStep'])

const handleChangeStep = (index: number, disabled: boolean) => {
  if (!disabled) {
    emit('changeStep', index)
  }
}

</script>

<style scoped lang="scss">
.lineup__step-navigation {
  margin-bottom: rem(20px);

  ul {
    display: flex;
  }

  &__item {
    width: 33.3%;
    max-width: 33.3%;
    display: flex;
    justify-content: center;
    position: relative;

    &::after {
      content: "";
      width: calc(100% - 40px);
      height: 2px;
      background: var(--gray-dark);
      position: absolute;
      top: 8px;
      left: calc(50% + 19px);
    }

    button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: rem(10px);
    }

    [class*="icon-"] {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: rem(7px);
      width: rem(18px);
      height: rem(18px);
      background: var(--gray-dark);
      color: var(--white);
      border-radius: rem(18px);
    }

    &--active {
      button {
        [class*="icon-"] {
          background: var(--primary);
        }
      }

      &::after {
        background: var(--primary);
      }
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>