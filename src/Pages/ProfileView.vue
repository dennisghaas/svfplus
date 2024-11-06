<template>
  <!-- Diese Seite redirected zu => team/(login user id) -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();

onMounted(async () => {
  await router.push(`/team/${store.state.userData.id}`);
});
</script>

<style scoped lang="scss"></style>
