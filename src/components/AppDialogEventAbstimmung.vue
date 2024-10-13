<template>
  <h2>Ooops!</h2>
  <BadgeType
    :badge-text="'Leider können Abstimmungen erstmal nur gelöscht werden.'"
    :badge-type="'error'"
  />
</template>

<script setup lang="ts">
import BadgeType from '@/components/BadgeType.vue'
</script>

<style scoped lang="scss"></style>
