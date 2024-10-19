<template>
  <div :class="['auth-form', { 'is-register': !showLogin }]">
    <div class="auth-form--header">
      <ContentImage :img-src="'logo.svg'" :img-alt="'SVF Plus App Logo'" />
    </div>

    <div class="auth-form--content">
      <LoginForm v-if="showLogin" />
      <RegisterForm v-else />
    </div>

    <div class="auth-form--footer text-center">
      <template v-if="showLogin">
        <p>
          Noch kein Konto?
          <button
            type="button"
            @click="changeView"
            class="button-text text-color-primary"
          >
            Erstelle dir hier eins
          </button>
        </p>
      </template>

      <template v-else>
        <p>
          Hast du bereits ein Konto?
          <button
            type="button"
            @click="changeView"
            class="button-text text-color-primary"
          >
            Melde dich hier an
          </button>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage.ts'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ContentImage from '@/components/ContentImage.vue'

const showLogin = ref(false)

const { loadValue } = useLocalStorage('alreadyRegistered', 'no')
const fetchedStorageRegisteredValue = ref('')

const changeView = () => {
  showLogin.value = !showLogin.value
}

onMounted(() => {
  fetchedStorageRegisteredValue.value = loadValue()

  if (fetchedStorageRegisteredValue.value === 'yes') {
    showLogin.value = true
  }
})
</script>

<style scoped lang="scss">
.auth-form {
  padding: $space-5 $space-2_5;
  border-radius: rem(10px);
  background: var(--white);
  overflow-y: scroll;
  width: calc(100% + #{$gutter-width * 4});
  left: calc(#{-$gutter-width * 2});
  position: relative;
  height: 100dvh;

  @include media-breakpoint-up(lg) {
    min-height: 50dvh;
    max-height: 50dvh;
  }

  &.is-register {
    @include media-breakpoint-up(lg) {
      max-height: 80dvh;
      height: auto;
    }
  }

  &--header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: rem(40px);
  }

  &--footer {
    margin-top: rem(10px);

    p {
      margin: 0;
    }
  }
}
</style>
