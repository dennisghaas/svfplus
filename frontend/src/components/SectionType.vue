<template>
  <section class="section">
    <template v-if="sectionHeader">
      <div class="section--header">
        <div class="row">
          <div class="col-xs-6">
            <slot name="sectionHeaderLeft"></slot>
          </div>
          <div class="col-xs-6 d-flex justify-content-end align-items-center">
            <slot name="sectionHeaderRight"></slot>
          </div>
        </div>
      </div>
    </template>
    <slot name="sectionContent"></slot>
  </section>
</template>

<script setup lang="ts">
defineProps({
  sectionHeader: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.section {
  margin: rem(80px) 0;
}
</style>

<style lang="scss">
.section {
  &--header {
    margin-bottom: rem(20px);
  }
}
</style>
