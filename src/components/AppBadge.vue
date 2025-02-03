<template>
  <div class="app-badge">
    <i class="icon-warning"></i>
    <span
      >Wir ziehen um! Registriere dich bis zum Ende der Woche
      <a href="https://www.svfplus.dennisghaas.com" target="_blank"
        ><strong>Hier</strong></a
      ></span
    >
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-badge {
  display: flex;
  align-items: center;
  gap: rem(10px);
  border-radius: rem(5px);
  padding: rem(10px) rem(20px);
  background: var(--error-soft);
  color: var(--error-dark);
  margin-bottom: rem(20px);
  font-size: $font-size-14;
}
</style>
