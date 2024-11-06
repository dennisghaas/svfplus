<template>
  <aside class="sidebar-navigation">
    <ContentImage :img-src="'logo.svg'" :img-alt="'Logo'" />
    <MainNavigation />
  </aside>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/MainNavigation.vue';
import ContentImage from '@/components/ContentImage.vue';
</script>

<style scoped lang="scss">
.sidebar-navigation {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: var(--white);
  height: 100%;
  padding: rem(40px);

  > .image {
    margin-bottom: rem(80px);
  }

  @include media-breakpoint-up(lg) {
    width: 33.3%;
  }

  @include media-breakpoint-up(xl) {
    width: 20%;
  }
}
</style>
