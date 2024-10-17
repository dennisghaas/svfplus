<template>
  <div class="card-member">
    <div class="card-member--main">
      <div class="card-member--main-image">
        <ProfilePanel
          :bg-color="user.userImage.bgColor"
          :user-initials="user.userImage.initials"
          :is-image="!user.userImage.bgColor.includes('--')"
        />

        <div class="dot--wrapper">
          <RoleDots
            v-for="dot in resolveRoleValue"
            :dot="dot"
            :additional-class="'card-member'"
          />
        </div>
      </div>

      <span v-if="user.jerseyNumber" class="card-member--number">
        {{ user.jerseyNumber }}
      </span>

      <span v-if="user.name || user.surname" class="card-member--name">
        {{ user.name }} <strong>{{ user.surname }}</strong>
      </span>

      <LinkType
        :btn-link="`/team/${user.id}`"
        :btn-text="`Profil von ${user.name} ansehen`"
        :btn-just-icon="true"
        :btn-icon="'icon-chevron-right'"
      />
    </div>

    <div v-if="user.isInjured" class="card-member--additional body-text-b3">
      <InjuredIcon />
      <p>
        Verletzt
      </p>
    </div>

    <!--(Arrow zum Profil)-->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RoleDots from '@/components/RoleDots.vue'
import LinkType from '@/components/LinkType.vue'
import InjuredIcon from '@/components/InjuredIcon.vue'
import ProfilePanel from '@/components/ProfilePanel.vue'
import { UserData } from '@/interface'

const props = defineProps<{
  user: UserData
}>()

const resolveRoleValue = computed(() => {
  try {
    return Array.isArray(props.user.role)
      ? props.user.role
      : JSON.parse(props.user.role.toLowerCase())
  } catch (e) {
    console.error('Fehler beim Parsen der Rolle:', e)
    return []
  }
})
</script>

<style scoped lang="scss">
.card-member {
  border-radius: rem(10px);
  margin-bottom: rem(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  &--main {
    background: var(--white);
    display: flex;
    align-items: center;
    padding: rem(10px) rem(20px);

    &-image {
      position: relative;
      display: flex;

      .dot--wrapper {
        display: flex;
        position: absolute;
        bottom: 0;
        right: rem(7px);
      }
    }
  }

  &--name,
  &--number {
    color: var(--black-75);
    display: block;
  }

  &--name {
    margin-left: rem(30px);
  }

  &--number {
    margin-left: rem(12px);
    font-weight: $font-weight-600;
  }

  .btn-link {
    margin-left: auto;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &--additional {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(5px);
    background: var(--error-soft);
    color: var(--error-dark);
    text-align: center;
    padding: rem(5px) 0;
  }

  @include media-breakpoint-up(lg) {
    transition: $transition-base;

    &:hover {
      transform: scale(1.025);
    }
  }
}
</style>
