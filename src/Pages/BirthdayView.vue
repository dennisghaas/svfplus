<template>
  <LinkType
    :btn-class="'btn-prev'"
    :btn-link="'./'"
    :btn-text="'Zurück zum Dashboard'"
    :btn-icon-prev="true"
    :btn-icon="'icon-chevron-left'"
  />
  <p>Geburtstage (tbd)</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import store from '@/store'
import LinkType from '@/components/LinkType.vue'

onMounted(() => {
  store.pageHeadline('Geburtstage des Teams')
})
</script>

<style scoped lang="scss"></style>
