<template>
  <nav v-if="!hideBottomNavigation" class="bottom-navigation">
    <div class="container">
      <ul class="blanklist">
        <template v-for="(item, index) in navigation" :key="index">
          <li
            v-if="
              item.showInMobileBar &&
              item.accessibleRouteFrom.includes(
                store.state.userData.accessRights
              )
            "
            :style="{ order: item.linkName === 'Erstellen' ? 0 : index - 1 }"
          >
            <router-link
              :to="item.linkUrl"
              :title="item.linkName + ' ' + 'öffnen'"
              :class="
                item.linkName === 'Profil' &&
                router.currentRoute.value.path ===
                  `/team/${store.state.userData.id}`
                  ? 'router-link-exact-active'
                  : ''
              "
              @click="routeLeave()"
            >
              <i
                v-if="item.properties[0].hasIcon"
                :class="item.properties[0].iconName"
              ></i>
              <ProfilePanel
                v-if="item.properties[0].isProfile"
                :bg-color="store.state.userData.userImage.bgColor"
                :user-initials="store.state.userData.userImage.initials"
                :hide-initials="store.state.userData.userImage.hideInitials"
                :is-image="
                  !store.state.userData.userImage.bgColor.includes('--')
                "
                :display-small="true"
              />
              <span class="d-none">{{ item.linkName }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { navigation } from '@/config';
import store from '@/store';
import ProfilePanel from '@/components/ProfilePanel.vue';
import { useRouter } from 'vue-router';

const routeLeave = () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

const router = useRouter();

defineProps({
  hideBottomNavigation: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.bottom-navigation {
  --border-radius-dots: #{rem(4px)};
  height: $bottomNavigationHeight;
  position: fixed;
  padding: rem(20px) 0 calc(#{rem(20px)} + $iphoneControlBottomHeight / 2) 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--white);
  border-radius: rem(20px) rem(20px) 0 0;
  z-index: $pageHeaderIndex;
  box-shadow: $box-shadow-mobile-navigation-reverse;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;

    li {
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--black);

        [class*='icon-'] {
          font-size: $font-size-24;
        }

        &.router-link-exact-active {
          position: relative;

          &::before {
            content: '';
            width: var(--border-radius-dots);
            height: var(--border-radius-dots);
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: calc(var(--border-radius-dots) * -2);
            background: var(--primary);
            border-radius: var(--border-radius-dots);
          }
        }
      }
    }
  }
}
</style>
