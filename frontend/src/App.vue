<template>
  <template v-if="!store.state.loadData"> Loading... </template>
  <template v-else>
    <template v-if="store.state.isLoggedIn && !store.state.isRegisterSuccess">
      <LayoutLoggenIn>
        <template #pageMainContent>
          <RouterView />
        </template>
      </LayoutLoggenIn>
    </template>
    <template
      v-else-if="store.state.isRegisterSuccess && !store.state.isLoggedIn"
    >
      <LayoutRegisterSuccess>
        <template #pageMainContent>
          <RouterView />
        </template>
      </LayoutRegisterSuccess>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </template>
</template>

<script lang="ts" setup>
import store from '@/store'
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth.ts'
import { useRouter } from 'vue-router'
import LayoutLoggenIn from '@/Layout/LayoutLoggenIn.vue'
import LayoutRegisterSuccess from '@/Layout/LayoutRegisterSuccess.vue'

const router = useRouter()
const { fetchUserDataOnLoad } = useAuth()

onMounted(() => {
  const token = localStorage.getItem('token') || null
  fetchUserDataOnLoad(token, router)
})
</script>

<style></style>
