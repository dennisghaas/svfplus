<template>
  <router-link
    v-if="btnLink"
    :class="[
      'btn',
      {
        'btn-link': btnLinkTypeLink,
        'btn-reverse': btnIconPrev,
        'btn-with-icon': btnIcon,
      },
      btnClass,
    ]"
    :to="btnLink"
    :target="btnTargetBlank ? '_blank' : '_self'"
    :title="btnText"
  >
    <span v-if="!btnJustIcon">
      {{ btnText }}
    </span>
    <i v-if="btnIcon" :class="btnIcon"></i>
  </router-link>
  <button
    v-else
    type="button"
    :class="[
      'btn',
      {
        'btn-link': btnLinkTypeLink,
        'btn-reverse': btnIconPrev,
        'btn-with-icon': btnIcon,
      },
      btnClass,
    ]"
    :title="btnText"
  >
    <span v-if="!btnJustIcon">
      {{ btnText }}
    </span>
    <i v-if="btnIcon" :class="btnIcon"></i>
  </button>
</template>

<script setup lang="ts">
defineProps({
  btnLink: {
    type: String,
    default: '',
  },
  btnLinkTypeLink: {
    type: Boolean,
    default: true,
  },
  btnText: {
    type: String,
    default: 'Btn Link',
  },
  btnIcon: {
    type: String,
    default: '',
  },
  btnIconPrev: {
    type: Boolean,
    default: false,
  },
  btnJustIcon: {
    type: Boolean,
    default: false,
  },
  btnTargetBlank: {
    type: Boolean,
    default: false,
  },
  btnClass: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
@import '@/styles/components/_button.scss';
</style>
