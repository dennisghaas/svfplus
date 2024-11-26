<template>
  <template v-if="store.state.loadingApp"> Daten werden geladen </template>
  <template v-else>
    <template v-if="store.state.loadData">
      <template v-if="store.state.isLoggedIn && !store.state.isRegisterSuccess">
        <LayoutLoggenIn
          v-if="store.state.watchedTutorial"
          :hide-bottom-navigation="isLineupRoute"
        >
          <template #pageMainContent>
            <RouterView />
          </template>
        </LayoutLoggenIn>
        <template v-else>
          <LayoutTutorial />
        </template>
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
    <template v-else>
      <RouterView />
    </template>
  </template>
</template>

<script lang="ts" setup>
import store from '@/store';
import { onMounted, ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth.ts';
import { useRouter, useRoute } from 'vue-router';
import { useHandleUserAccess } from '@/composables/useHandleUserAccess.ts';
import LayoutLoggenIn from '@/Layout/LayoutLoggenIn.vue';
import LayoutRegisterSuccess from '@/Layout/LayoutRegisterSuccess.vue';
import LayoutTutorial from '@/Layout/LayoutTutorial.vue';

const router = useRouter();
const route = useRoute();
const { fetchUserDataOnLoad } = useAuth();
const { userAllowedToUseWebApp } = useHandleUserAccess();

const isLineupRoute = computed(() => route.path === '/lineup');

onMounted(() => {
  const token = localStorage.getItem('token') || null;
  fetchUserDataOnLoad(token, router);
});

const loading = ref(true);

onMounted(async () => {
  await userAllowedToUseWebApp(router);
  loading.value = false;
});
</script>

<style></style>
