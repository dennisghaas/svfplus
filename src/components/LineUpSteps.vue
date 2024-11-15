<template>
  <LinkType
    v-if="activeStep === 0 && showPrevLink"
    :btn-class="'btn-prev w-100'"
    :btn-text="'Zurück zur Auswahl'"
    :btn-icon-prev="true"
    :btn-icon="'icon-chevron-left'"
    @click="handleWelcomeViewClick"
  />
  <nav v-if="!isDesktop" class="line-up-steps">
    <ul class="blanklist">
      <li
        v-for="step in steps"
        :key="step.index"
        :class="[
          'line-up-step',
          { 'line-up-step--active': step.index <= activeStep },
        ]"
      >
        <button
          class="line-up-step__button"
          type="button"
          @click="step.index <= activeStep && handleChangeStep(step.index)"
        >
          <span class="line-up-step__button-icon">
            <i
              :class="step.index <= activeStep ? 'icon-check' : 'icon-close'"
            ></i>
          </span>
          <span>{{ step.name }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import { LineUpStep } from '@/interface';
import LinkType from '@/components/LinkType.vue';

const { isDesktop } = useBreakpoint();

defineProps({
  activeStep: {
    type: Number,
    default: null,
  },
  steps: {
    type: Array as () => LineUpStep[],
    default: () => [] as LineUpStep[],
  },
  showPrevLink: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: 'change-step', index: number): void;
  (event: 'welcomeViewClick'): void;
}>();

const handleChangeStep = (index: number) => {
  emit('change-step', index);
};

const handleWelcomeViewClick = () => {
  emit('welcomeViewClick');
};
</script>

<style scoped lang="scss">
.line-up-steps {
  margin-bottom: rem(20px);

  ul {
    display: flex;
  }

  .line-up-step {
    width: 33.3%;
    max-width: 33.3%;
    display: flex;
    justify-content: center;
    position: relative;

    &:not(:last-child) {
      &::after {
        content: '';
        width: calc(100% - #{rem(40px)});
        height: 2px;
        background: var(--gray-dark);
        position: absolute;
        top: 8px;
        left: calc(50% + #{rem(20px)});
      }
    }

    &.line-up-step--active {
      &::after {
        background: var(--primary);
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: rem(18px);
        height: rem(18px);
        border-radius: 50%;
        color: var(--white);
        background: var(--gray-dark);
        font-size: rem(6px);
        margin-bottom: rem(10px);

        .icon-check {
          font-size: rem(9px);
        }
      }
    }

    &--active {
      .line-up-step__button {
        &-icon {
          background: var(--primary);
        }
      }
    }
  }
}
</style>
