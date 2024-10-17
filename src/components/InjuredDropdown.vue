<template>
  <CheckboxType
      :id="'is-injured'"
      :value="isInjuredVal"
      :label="isCurrentUsersProfile ? 'Bist du verletzt?' : `${usersName} ist verletzt?`"
      :no-border="isInjuredVal || !store.state.isMajor"
      @update:model-value="updateIsInjured"
  />
  <BadgeType
      v-if="isInjuredVal"
      :badge-type="'warning'"
      :badge-text="`Mit dieser Einstellung ${isCurrentUsersProfile ? 'wirst du' : `wird ${usersName}`} für kommende Spiele nicht nominiert`"
  />
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import store from "@/store";
import CheckboxType from '@/components/CheckboxType.vue'
import BadgeType from "@/components/BadgeType.vue";

const props = defineProps({
  isInjured: {
    type: Boolean,
    default: false,
  },
  isCurrentUsersProfile: {
    type: Boolean,
    default: false
  },
  usersName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update:is-injured'
])

const isInjuredVal = ref(props.isInjured)

watch(
    () => props.isInjured,
    (newValue) => {
      isInjuredVal.value = newValue
    },
)

const updateIsInjured = (injured: boolean) => {
  isInjuredVal.value = injured
  emit('update:is-injured', injured)
}
</script>

<style scoped lang="scss"></style>
