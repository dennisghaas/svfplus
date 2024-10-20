<template>
  <div
    v-if="badgeText"
    :class="[
      'badge',
      badgeType ? `badge--${badgeType}` : '',
      additionalClass ? `badge--${additionalClass}` : '',
      badgeCentered ? `badge--centered` : '',
      badgeAlt ? `badge--alt` : '',
    ]"
  >
    <template v-if="badgeType === 'injured'">
      <InjuredIcon />
      <span>{{ badgeText }}</span>
    </template>
    <template v-if="badgeNoIcon">
      <span v-html="badgeText" />
    </template>
    <template v-else>
      <i :class="genIconNameOnType(badgeType)"></i>
      <span v-html="badgeText" />
    </template>
  </div>
</template>

<script setup lang="ts">
import InjuredIcon from '@/components/InjuredIcon.vue'

defineProps({
  badgeType: {
    type: String,
    default: '',
  },
  badgeText: {
    type: [String, Array],
    default: 'badge',
  },
  additionalClass: {
    type: String,
    default: '',
  },
  badgeCentered: {
    type: Boolean,
    default: false,
  },
  badgeAlt: {
    type: Boolean,
    default: false,
  },
  badgeNoIcon: {
    type: Boolean,
    default: false
  }
})

const genIconNameOnType = (type: string) => {
  if (type === 'error') {
    return 'icon-warning'
  }
  if (type === 'success') {
    return 'icon-check'
  }

  return 'icon-' + type
}
</script>

<style scoped lang="scss">
.badge {
  padding: rem(10px) rem(30px);
  border-radius: rem(5px);
  background: transparent;
  display: flex;
  align-items: center;
  margin: 0 0 rem(10px);

  [class*='icon-'] {
    margin-right: rem(10px);
  }

  &--warning {
    background: var(--warning-soft);
    color: var(--warning-dark);
  }

  &--info {
    background: var(--blue-light);
    color: var(--blue-dark-gray);
  }

  &--error,
  &--injured {
    background: var(--error-soft);
    color: var(--error-dark);
  }

  &--injured {
    gap: rem(10px);
  }

  &--success {
    background: var(--success-soft);
    color: var(--success-dark);
  }

  span,
  i::before {
    font-size: $font-size-14;
  }

  &--for {
    &-card {
      padding: rem(10px);
      justify-content: center;

      span {
        text-align: center;
      }
    }
  }

  &--max-content {
    max-width: max-content;
  }

  &--centered {
    justify-content: center;
  }

  &--alt {
    padding: rem(10px);
  }

  &--event {
    margin-top: rem(15px);
  }
}
</style>
