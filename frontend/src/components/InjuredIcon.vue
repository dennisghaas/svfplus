<template>
  <span class="injured-icon">
    <i class="icon-injured"></i>
  </span>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.injured-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: rem(16px);
  height: rem(16px);
  background: var(--error-dark);
  color: var(--white);
  border-radius: 50%;

  i {
    font-size: 7px;
  }
}
</style>
