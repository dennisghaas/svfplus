<template>
  <div class="loading-response">
    <div class="loading-response--inner">
      <ContentImage
        :img-src="'loading-white.gif'"
        :img-alt="'loading'"
        :img-class="'loading'"
      />
      <div class="body-text-b2">
        <p>
          {{ store.state.loadingResponseText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '@/store'
import ContentImage from '@/components/ContentImage.vue'
</script>

<style scoped lang="scss">
.loading-response {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--black-75);
  z-index: $loadingIndex;
  color: var(--white);

  &--inner {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 #{$gutter-width * 2};
    text-align: center;

    .loading {
      max-width: rem(42px);
      margin-bottom: rem(15px);
    }
  }
}
</style>
