<template>
  <SectionType class="mt-0">
    <template #sectionContent>
      <div class="team-view">
        <div class="team-view--header">
          <div class="row">
            <div class="col-xs-12 col-md-6 col-lg-12 col-xl-6">
              <SelectType
                class="team-view--header-select"
                :select-title="'Filtern nach'"
                :select-i-d="'filter-roles'"
                :select-name="'Filter nach Rollen'"
                :select-option="accessibleRoles"
                :select-placeholder="'Alle'"
                :count-filtered-options="countUpdatedValue"
                @update:selection="handleSelection"
              />
            </div>
            <div
              class="col-xs-12 col-md-6 col-lg-12 col-xl-6 d-flex justify-content-end"
            >
              <ul class="blanklist legend">
                <li>
                  <RoleDots :dot="'trainer'" />
                  Trainer
                </li>
                <li>
                  <RoleDots :dot="'spieler'" />
                  Spieler
                </li>
                <li>
                  <RoleDots :dot="'kassenwart'" />
                  Kassenwart
                </li>
                <li>
                  <RoleDots :dot="'mannschaftsrat'" />
                  Mannschaftsrat
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="team-view--body">
          <div class="row">
            <div
              v-for="(user, index) in filteredUsers"
              :key="index"
              class="col-xs-12 col-md-6"
              :class="{ 'order-first': user.role.includes('Trainer') }"
            >
              <CardMember :user="user" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </SectionType>

  <!-- hide option to edit all players once in modal for now -->
  <SectionType v-if="false">
    <template #sectionContent>
      <div class="row">
        <div class="col-xs-12 d-flex justify-content-end">
          <ButtonType
            :btn-class="'w-max-content'"
            :btn-text="'Spielerliste bearbeiten'"
            :type-button="true"
            :btn-icon="'icon-edit'"
          />
        </div>
      </div>
    </template>
  </SectionType>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, Ref } from 'vue'
import { useUser } from '@/composables/useUser.ts'
import store from '@/store'
import { accessibleRoles } from '@/config'
import { UserData } from '@/interface'
import CardMember from '@/components/CardMember.vue'
import RoleDots from '@/components/RoleDots.vue'
import SectionType from '@/components/SectionType.vue'
import SelectType from '@/components/SelectType.vue'
import ButtonType from '@/components/ButtonType.vue'

const { fetchAllUsers } = useUser()
const { completeUserData } = useUser() as { completeUserData: Ref<UserData[]> }
const updatedValue = ref('Alle')
const countUpdatedValue = ref(0)

const filteredUsers = computed<UserData[]>(() => {
  if (!completeUserData.value) {
    return [] // Ensure this is an empty array of type UserData[]
  }

  // Filter out users who are not activated
  const activatedUsers = completeUserData.value.filter(
    (user) => user.userIsActivated && user.username !== 'admin',
  ) as UserData[]

  if (updatedValue.value === 'Alle') {
    countUpdatedValue.value = activatedUsers.length
    return activatedUsers // This should return UserData[] here
  }

  // Further filter based on role
  const filtered = activatedUsers.filter((user) =>
    user.role.includes(updatedValue.value),
  ) as UserData[]
  countUpdatedValue.value = filtered.length

  return filtered // Ensure this returns UserData[] as well
})

const handleSelection = (selectedValue: string) => {
  updatedValue.value = selectedValue
}

onMounted(() => {
  fetchAllUsers()
  store.pageHeadline('Team Übersicht')
})
</script>

<style scoped lang="scss">
.team-view {
  &--header {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: rem(20px);
    padding-bottom: rem(20px);

    &-select {
      margin-bottom: 20px;

      @include media-breakpoint-up(md) {
        margin-bottom: 0;
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: 20px;
      }

      @include media-breakpoint-up(xl) {
        margin-bottom: 0;
      }
    }

    @include media-breakpoint-up(md) {
      margin-bottom: rem(40px);
      padding-bottom: rem(40px);
    }

    @include media-breakpoint-up(lg) {
      margin-bottom: rem(20px);
      padding-bottom: rem(20px);
    }

    @include media-breakpoint-up(xl) {
      margin-bottom: rem(40px);
      padding-bottom: rem(40px);
    }
  }
}

.legend {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: rem(20px) rem(40px);
}
</style>
