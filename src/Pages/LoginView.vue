<template>
  <main class="pageAuth">
    <div class="container-login">
      <AuthForm />
    </div>

    <ContentImage
      class="d-none d-md-block"
      :lazy-load="false"
      :img-src="'login-bg-desktop.webp'"
      :img-alt="'SVF Plus App Background'"
      :img-class="'pageAuth--bg'"
    />
  </main>
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue';
import ContentImage from '@/components/ContentImage.vue';
</script>

<style scoped lang="scss">
.pageAuth {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  overflow: hidden;
  height: 100dvh;
  position: relative;

  &--logo {
    position: absolute;
    right: rem(20px);
    bottom: rem(40px);
  }

  &--bg {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
}
</style>
