<template>
  <form @submit.prevent="onLogin">
    <div class="row">
      <div class="col-xs-12">
        <InputType
          :id="'username'"
          :label="'Username'"
          v-model:modelValue="username"
          :input-type="'text'"
          :input-placeholder="'Username'"
        />
      </div>
      <div class="col-xs-12">
        <InputType
          :id="'password'"
          :label="'Passwort'"
          v-model:modelValue="password"
          :input-type="'password'"
          :input-placeholder="'Password'"
        />
      </div>
    </div>

    <BadgeType :badge-type="'error'" :badge-text="responseText" />

    <ButtonType
      :btn-class="'w-100'"
      :type-submit="true"
      :btn-text="'Anmelden'"
    />
  </form>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import InputType from '@/components/InputType.vue';
import ButtonType from '@/components/ButtonType.vue';
import BadgeType from '@/components/BadgeType.vue';

const router = useRouter();
const { username, password, handleLogin, responseText } = useAuth();

const onLogin = () => {
  handleLogin(router);
};
</script>

<style scoped></style>
