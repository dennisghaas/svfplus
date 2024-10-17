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
    :hide-bottom-navigation="store.state.menuOpen"
  />
  <main class="pageMain">
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
console.log(
  'mobile?:',
  isMobile.value,
  'tablet?',
  isTablet.value,
  'desktop?',
  isDesktop.value,
)
</script>

<style scoped lang="scss">
.pageMain {
  padding-top: rem(40px);
  background: var(--gray-soft);
  min-height: calc(100vh - #{$pageHeaderHeight});
  height: 100%;

  /* (bottom navigation height) */
  padding-bottom: $bottomNavigationHeight;

  @include media-breakpoint-up(lg) {
    margin-left: auto;
    width: 66.66%;
    min-height: calc(100vh - #{$pageHeaderHeightDesktop});
  }

  @include media-breakpoint-up(xl) {
    width: 80%;
  }
}
</style>
