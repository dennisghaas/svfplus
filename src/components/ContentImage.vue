<template>
  <figure v-if="imgSrc && imgAlt" class="image" :class="imgClass">
    <img
      v-if="lazyLoad"
      :src="`/images/${imgSrc}`"
      :alt="imgAlt"
      loading="lazy"
    />
    <img v-else :src="`/images/${imgSrc}`" :alt="imgAlt" loading="eager" />

    <figcaption v-if="imgCaption">
      {{ imgCaption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps({
  imgSrc: {
    type: String,
    default: '',
  },
  imgAlt: {
    type: String,
    default: '',
  },
  lazyLoad: {
    type: Boolean,
    default: true,
  },
  imgCaption: {
    type: String,
    default: '',
  },
  imgClass: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.pageAuth--bg {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
