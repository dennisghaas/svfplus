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
  margin-top: rem(40px);

  /* (bottom navigation height) */
  margin-bottom: rem(80px);

  @include media-breakpoint-up(lg) {
    margin-left: auto;
    width: 66.66%;
  }

  @include media-breakpoint-up(xl) {
    width: 80%;
  }
}
</style>
