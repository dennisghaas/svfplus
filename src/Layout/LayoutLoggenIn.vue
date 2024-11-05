<template>
  <!-- Page Reload Loading on Api Response -->
  <LoadingResponse v-if="store.state.loadingResponse" />

  <!-- Desktop & Mobile -->
  <PageHeader />

  <!-- Just Desktop -->
  <SidebarNavigation v-if="isDesktop" />

  <!-- Just Mobile -->
  <BottomNavigation
    v-if="isMobile || isTablet"
    :hide-bottom-navigation="store.state.menuOpen || removePadding || hideBottomNavigation"
  />
  <main :class="['pageMain', {'pageMain--no-padding' : removePadding}, {'pageMain--no-bottom-nav' : hideBottomNavigation}]">
    <div class="container">
      <slot name="pageMainContent"></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import store from '@/store'
import { useBreakpoint } from '@/composables/useBreakpoint.ts'

import PageHeader from '@/components/PageHeader.vue'
import SidebarNavigation from '@/components/SidebarNavigation.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import LoadingResponse from '@/components/LoadingResponse.vue'

/* to detect device width */
const { isMobile, isTablet, isDesktop } = useBreakpoint()

defineProps({
  removePadding: {
    type: Boolean,
    default: false
  },
  hideBottomNavigation: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.pageMain {
  margin-top: #{-$pageHeaderHeight};
  padding-top: calc(#{$pageHeaderHeight} + rem(40px));
  background: var(--gray-soft);
  min-height: calc(100vh - #{$pageHeaderHeight});
  height: 100%;

  /* (bottom navigation height) */
  padding-bottom: $bottomNavigationHeight;

  @include media-breakpoint-up(lg) {
    margin-left: auto;
    width: 66.66%;
    min-height: calc(100vh - #{$pageHeaderHeightDesktop});
    padding-top: rem(40px);
    margin-top: 0;
  }

  @include media-breakpoint-up(xl) {
    width: 80%;
  }

  &--no-bottom-nav {
    min-height: 100vh;
    padding-bottom: rem(40px);

    @include media-breakpoint-up(lg) {
      padding-top: 0;
    }
  }

  &--no-padding {
    min-height: 100vh;
    padding-bottom: 0;

    @include media-breakpoint-up(lg) {
      padding-top: 0;
    }
  }
}
</style>
