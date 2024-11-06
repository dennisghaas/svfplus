<template>
  <component
      :is="link ? 'router-link' : 'div'"
      v-bind="link ? { to: link } : {}"
      :class="[
        'profile-panel',
        { 'profile-panel--reverse': displayReverse },
        { 'profile-panel--link': link },
        { 'profile-panel--medium': displayMedium },
        { 'profile-panel--small': displaySmall }
      ]"
  >
    <div
        :class="[
          'profile-panel__generic-image',
          { 'profile-panel__generic-image-has-border': addBorder },
          { 'profile-panel__custom-image': isImage },
          { 'profile-panel__is-add-button': isAddButton }
        ]"
        :style="computedStyle"
    >
      <template v-if="!isAddButton">
        {{ userInitials }}
      </template>
      <template v-else>
        <i class="icon-injured"></i>
      </template>
    </div>
    <span v-if="userName"
          :class="['profile-panel__name', { 'profile-panel__name--small': displayMedium || displaySmall }]">
      {{ userName }}
    </span>
  </component>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  userInitials: {
    type: String,
    default: '',
  },
  userName: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: '',
  },
  displayReverse: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: '',
  },
  addBorder: {
    type: Boolean,
    default: false,
  },
  displaySmall: {
    type: Boolean,
    default: false,
  },
  displayMedium: {
    type: Boolean,
    default: false
  },
  isImage: {
    type: Boolean,
    default: false,
  },
  isAddButton: {
    type: Boolean,
    default: false
  }
})

const computedStyle = computed(() => {
  return {
    '--profile-generic-image-bg': !props.isImage ? `var(${props.bgColor})` : undefined,
    '--profile-custom-image-bg': props.isImage ? `url(${props.bgColor})` : undefined,
  };
});
</script>

<style scoped lang="scss">
.profile-panel {
  display: flex;
  align-items: center;
  gap: rem(10px);
  max-width: max-content;
  text-decoration: none;

  &--reverse {
    display: flex;
    flex-direction: row-reverse;
  }

  &__generic-image {
    text-transform: uppercase;
    width: rem(50px);
    height: rem(50px);
    min-width: rem(50px);
    min-height: rem(50px);
    border-radius: 50%;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--profile-generic-image-bg);
    font-size: $font-size-18;

    &-has-border {
      border: 2px solid var(--white);
    }

    .profile-panel--small & {
      width: rem(26px);
      height: rem(26px);
      min-width: rem(26px);
      min-height: rem(26px);
      border-width: 1px;
      font-size: rem(10px);
    }

    .profile-panel--medium & {
      width: rem(36px);
      height: rem(36px);
      min-width: rem(36px);
      min-height: rem(36px);
      border-width: 1px;
      font-size: rem(14px);
    }

    &.profile-panel__custom-image {
      background-image: var(--profile-custom-image-bg);
      color: var(--black);
    }
  }

  &__is-add-button {
    [class*="icon-"] {
      font-size: $font-size-12;
    }
  }

  &__name {
    font-size: $font-size-18;

    &--small {
      font-size: $font-size-16;
    }
  }
}
</style>
