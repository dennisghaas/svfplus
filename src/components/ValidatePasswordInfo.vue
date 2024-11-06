<template>
  <ul class="blanklist validate-form-info">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="{ success: item.met }"
    >
      <i :class="item.met ? 'icon-check' : 'icon-close'"></i>
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';

const props = defineProps({
  password: {
    type: String,
    default: '',
  },
});

// Reactive list with an additional 'met' property to track if the condition is fulfilled
const list = reactive([
  {
    name: 'Mindestens 8 Zeichen',
    met: false,
  },
  {
    name: 'Enthält mindestens einen Kleinbuchstaben',
    met: false,
  },
  {
    name: 'Enthält mindestens einen Großbuchstaben',
    met: false,
  },
  {
    name: 'Enthält mindestens eine Nummer',
    met: false,
  },
  {
    name: 'Enthält mindestens ein Sonderzeichen',
    met: false,
  },
]);

// Function to validate the password and update the list
const validateForm = (password: string) => {
  // Update each condition based on the current password value
  list[0].met = password.length >= 8;
  list[1].met = /[a-z]/.test(password); // Contains a lowercase letter
  list[2].met = /[A-Z]/.test(password); // Contains an uppercase letter
  list[3].met = /\d/.test(password); // Contains a number
  list[4].met = /[@$!%*?&]/.test(password); // Contains a special character
};

// Watch for changes in the password and validate
watch(
  () => props.password,
  (newVal) => {
    validateForm(newVal);
  }
);
</script>

<style scoped lang="scss">
.validate-form-info {
  margin-bottom: rem(20px);
  font-size: $font-size-12;

  li {
    display: flex;
    margin-bottom: rem(5px);
    color: var(--primary);

    [class*='icon-'] {
      font-size: $font-size-10;
      position: relative;
      top: rem(4px);
      margin-right: rem(5px);
    }

    &:last-child {
      margin-bottom: 0;
    }

    &.success {
      color: var(--success-mint);
    }
  }
}
</style>
