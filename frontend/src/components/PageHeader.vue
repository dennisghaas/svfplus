<template>
  <header class="pageHeader">
    <div class="pageHeader--main" :class="store.state.menuOpen ? 'open' : ''">
      <template v-if="isMobile || isTablet">
        <div class="container">
          <div class="pageHeader--main-inner">
            <ContentImage
              :img-src="'logo.svg'"
              :img-alt="'SVF App Logo'"
              :img-class="'logo'"
            />

            <BurgerMenu
              @toggle-dropdown="toggleDropdown"
              :active="store.state.menuOpen"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="container">
          <div class="pageHeader--main-top">
            <h1>{{ store.state.pageHeadline }}</h1>

            <ProfilePanel
              :user-name="store.state.userData.name"
              :display-reverse="true"
              :user-initials="store.state.userData.userImage.initials"
              :bg-color="store.state.userData.userImage.bgColor"
              :link="'/dein-profil'"
              :is-image="!store.state.userData.userImage.bgColor.includes('--')"
            />
          </div>
        </div>
      </template>
    </div>

    <nav
      v-if="isMobile || isTablet"
      v-show="store.state.menuOpen"
      class="pageHeader--nav"
    >
      <div class="container">
        <MainNavigation />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBreakpoint } from '@/composables/useBreakpoint.ts'
import store from '@/store'
import ContentImage from '@/components/ContentImage.vue'
import BurgerMenu from '@/components/BurgerMenu.vue'
import MainNavigation from '@/components/MainNavigation.vue'
import ProfilePanel from '@/components/ProfilePanel.vue'

const { isMobile, isTablet } = useBreakpoint()
const showDropdown = ref(store.state.menuOpen)

const toggleDropdown = () => {
  store.menuOpen(!store.state.menuOpen)
}

watch(
  () => store.state.menuOpen,
  (newVal) => {
    showDropdown.value = newVal
  },
)
</script>

<style scoped lang="scss">
.pageHeader {
  position: sticky;
  top: 0;

  @include media-breakpoint-up(lg) {
    width: 66.6%;
    margin-left: auto;
    border-radius: 0;
    position: relative;
    height: inherit;
    padding: 0;
    background: transparent;
  }

  @include media-breakpoint-up(xl) {
    width: 80%;
  }

  &--main {
    height: rem($pageHeaderHeight);
    padding: rem(20px) 0;
    background: var(--white);
    border-radius: 0 0 rem(20px) rem(20px);

    &.open {
      border-radius: 0;
      border-bottom: 1px solid var(--border-color);
    }

    &-inner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @include media-breakpoint-up(lg) {
      /* offset mobile styling */
      height: inherit;
      background: transparent;
      border-radius: 0;

      /* new styling */
      padding: rem(40px) 0;
    }

    &-top {
      @include media-breakpoint-up(lg) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .burger-menu {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }

  &--nav {
    height: calc(100dvh - rem($pageHeaderHeight));
    background: var(--white);
    padding: rem(20px) 0;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;

    > .container {
      height: 100%;
    }
  }
}
</style>
