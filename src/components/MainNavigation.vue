<template>
  <ul class="main-navigation blanklist">
    <li>
      <span class="typo-label"> Menü </span>
    </li>
    <template v-for="item in navigation" :key="item.linkName">
      <li v-if="item.accessibleRouteFrom.includes(store.state.userData.accessRights)">
        <!-- handleRouteLeave() just for mobile -->
        <router-link
            :to="item.linkUrl"
            @click="isMobile ? handleRouteLeave() : ''"
            :class="
          item.linkName === 'Profil' &&
          router.currentRoute.value.path === `/team/${store.state.userData.id}`
            ? 'router-link-exact-active'
            : ''
        "
        >
          <template v-if="item.properties">
            <i
                v-if="item.properties[0].hasIcon"
                :class="item.properties[0].iconName"
            ></i>
            <ProfilePanel
                v-if="item.properties[0].isProfile"
                :user-initials="store.state.userData.userImage.initials"
                :bg-color="store.state.userData.userImage.bgColor"
                :add-border="true"
                :display-small="true"
                :is-image="!store.state.userData.userImage.bgColor.includes('--')"
            />
          </template>
          <span>{{ item.linkName }}</span>
        </router-link>
      </li>
    </template>
    <li class="main-navigation--logout">
      <button type="button" @click="onLogout()">
        <i class="icon-logout"></i>
        <span>Ausloggen</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth.ts'
import { useRouter } from 'vue-router'
import { useHandleDropdownOnRouteLeave } from '@/composables/useHandleDropdownOnRouteLeave.ts'
import { useBreakpoint } from '@/composables/useBreakpoint.ts'

import store from '@/store'
import { navigation } from '@/config.ts'
import ProfilePanel from '@/components/ProfilePanel.vue'

const { handleLogout } = useAuth()
const { handleRouteLeave } = useHandleDropdownOnRouteLeave()

const { isMobile } = useBreakpoint()
const router = useRouter()

const onLogout = () => {
  handleLogout(router)
}
</script>

<style scoped lang="scss">
.sidebar-navigation {
  .main-navigation {
    overflow-y: scroll;

    li {
      &:first-child {
        margin-bottom: rem(20px);

        span {
          margin-bottom: 0;
        }
      }

      &:not(:first-child, :last-child) {
        margin-bottom: rem(30px);
      }

      a {
        padding: rem(15px) rem(40px);
        border-radius: rem(10px);

        &.router-link-exact-active {
          background: var(--primary);
          color: var(--white);
          box-shadow: 0 rem(3px) rem(15px) var(--primary-50);
        }

        @include media-breakpoint-up(lg) {
          transition: $transition-fast;

          &:hover {
            background: var(--primary);
            color: var(--white);
            box-shadow: 0 rem(3px) rem(15px) var(--primary-50);
          }
        }
      }

      @include media-breakpoint-up(lg) {
        &.main-navigation--logout {
          button {
            transition: $transition-fast;

            &:hover {
              color: var(--primary);
            }
          }
        }
      }
    }
  }
}

.pageHeader {
  .main-navigation {
    overflow-y: scroll;

    li {
      border-bottom: 1px solid var(--border-color);

      a {
        padding: rem(20px) 0;
      }

      &:first-child {
        border-bottom: 0;

        a {
          padding-top: 0;
        }
      }

      &:last-child,
      &:nth-last-child(2) {
        border-bottom: 0;
      }

      &:nth-last-child(2) {
        margin-bottom: rem(40px);
      }
    }
  }
}

.main-navigation {
  display: flex;
  flex-direction: column;
  height: 100%;

  li {
    a,
    button {
      display: flex;
      align-items: center;
      font-size: $font-size-18;
      color: var(--black);
      text-decoration: none;

      > :first-child {
        margin-right: rem(20px);
      }

      [class*='icon-'] {
        font-size: $font-size-21;
      }
    }

    a {
      &.router-link-exact-active {
        span {
          font-weight: $font-weight-600;

          @include media-breakpoint-up(lg) {
            font-weight: $font-weight-400;
          }
        }
      }
    }

    &:last-child {
      margin-top: auto;
    }
  }
}
</style>
