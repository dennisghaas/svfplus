<template>
  <a class="link-extern" :href="link" target="_blank">
    <span>Weitere Infos auf Fussball.de</span>
    <i class="icon-external"></i>
  </a>
</template>

<script setup lang="ts">
defineProps({
  link: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.link-extern {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: rem(10px);
  text-decoration: none;
  font-weight: $font-weight-500;

  > span {
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 1px;
      background: var(--black);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  [class*='icon-'] {
    font-size: $font-size-12;
  }
}
</style>
