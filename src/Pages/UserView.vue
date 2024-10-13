<template>
  <LinkType
      v-if="!isCurrentUsersProfile"
      :btn-class="'btn-prev'"
      :btn-link="'./'"
      :btn-text="'Zurück zur Team Übersicht'"
      :btn-icon-prev="true"
      :btn-icon="'icon-chevron-left'"
  />

  <template v-if="loaded">
    <template v-if="!getUserNotFound">
      <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-12 col-xl-6">
          <CardProfile
              :title="getSelectedUser?.name || ''"
              :subtitle="getSelectedUser?.role || ''"
              :name="getSelectedUser?.name || ''"
              :surname="getSelectedUser?.surname || ''"
              :email="getSelectedUser?.email || ''"
              :position="getSelectedUser?.position || ''"
              :birthday="
              getSelectedUser?.birthday instanceof Date
                ? getSelectedUser.birthday.toISOString().split('T')[0]
                : ''
            "
              :got-suit="getSelectedUser?.gotSuit || false"
              :debts="getFormattedDebts"
              :id="getSelectedUser?.id || 0"
              :is-injured="getSelectedUser?.isInjured || false"
              :is-injured-type="getSelectedUser?.isInjuredType || ''"
              :role="getSelectedUser?.role || ''"
              :jersey-number="getSelectedUser?.jerseyNumber || 0"
              :bg-color="getSelectedUser?.userImage?.bgColor || ''"
              :initials="getSelectedUser?.userImage?.initials || ''"
              :is-current-users-profile="isCurrentUsersProfile"
          />
        </div>

        <div class="col-xs-12 col-md-6 col-lg-12 col-xl-6">
          <div class="row">
            <div class="col-xs-12 col-lg-6">
              <CardDebts
                  :debts="getFormattedDebts"
                  :role="getSelectedUser?.role || ''"
              />
            </div>

            <div class="col-xs-12 col-lg-6">
              <CardParticipation
                  :current-user-profile="isCurrentUsersProfile"
                  :current-user-name="store.state.userData.name || ''"
                  :user-name="getSelectedUser?.name || ''"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <BadgeType
          :badge-text="'Wir konnten keinen Nutzer finden'"
          :badge-type="'error'"
      />
    </template>
  </template>
  <template v-else> ... </template>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/useUser.ts'
import { UserData } from '@/interface'
import LinkType from '@/components/LinkType.vue'
import CardProfile from '@/components/CardProfile.vue'
import BadgeType from '@/components/BadgeType.vue'
import store from '@/store'
import CardDebts from '@/components/CardDebts.vue'
import CardParticipation from '@/components/CardParticipation.vue'

/* get users id */
const router = useRouter()
const currentRoute = router.currentRoute.value.path
const userID = ref(Number(currentRoute.split('/').pop()))
const getSelectedUser = ref<UserData | null>(null)
const getUserNotFound = ref(false)
const getFormattedDebts = ref(0)
const loaded = ref(false)
const isCurrentUsersProfile = ref(false)

onMounted(async () => {
  /* fetch data based on current ID */
  const { getUserByID, selectedUser, userNotFound } = useUser()
  await getUserByID(userID.value)

  getUserNotFound.value = userNotFound.value
  getSelectedUser.value = selectedUser.value

  if (getSelectedUser.value) {
    getFormattedDebts.value = Number(getSelectedUser.value.debts);
  }

  loaded.value = true

  isCurrentUsersProfile.value = userID.value === store.state.userData.id

  // Use type guard to safely access properties of selectedUser
  if (selectedUser.value) {
    store.pageHeadline(
      isCurrentUsersProfile.value
        ? 'Dein Profil'
        : `${selectedUser.value.name} ${selectedUser.value.surname}`,
    )
  } else {
    store.pageHeadline('Benutzer nicht gefunden') // Fallback if no user is found
  }
})
</script>

<style scoped lang="scss"></style>
