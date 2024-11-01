<template>
  <template v-if="viewSelectedPlayer && !viewSelectedPosition && !viewSwapPlayer">
    <SelectType
        :dynamic-property="'pos'"
        :select-placeholder="'Neue Position...'"
        :hide-count="true"
        :select-name="`Neuen Position für ${selectedUser ? selectedUser?.name : 'Spieler'} auswählen`"
        :disable-placeholder-val="false"
        :select-title="'Verfügbare Positionen'"
        :select-option="filteredLineUpFormation"
        :select-i-d="'lineUpPlayer'"
        @update:selection="updateSelectedPosition"
    />

    <ButtonType
        :btn-text="`${selectedUser?.name} aufstellen`"
        :type-button="true"
        :btn-class="'w-100'"
        :disabled="throwError"
        @click="handleClose(selectedUser, false, selectedPosition)"
    />
  </template>
  <template v-else-if="!viewSelectedPlayer && viewSelectedPosition && !viewSwapPlayer">
    <SelectType
        :dynamic-property="'name'"
        :select-placeholder="'Spieler auswählen...'"
        :hide-count="true"
        :select-name="`Neuen Position für ${selectedUser ? selectedUser?.name : 'Spieler'} auswählen`"
        :disable-placeholder-val="false"
        :select-title="'Verfügbare Spieler'"
        :select-option="filteredLineUpUser"
        :select-i-d="'lineUpFormation'"
        @update:selection="updateSelectedPlayer"
    />

    <ButtonType
        :btn-text="`${selectedUserData?.name === undefined ? 'Spieler' : selectedUserData?.name} als ${selectedPosition.pos.toUpperCase()} aufstellen`"
        :type-button="true"
        :btn-class="'w-100'"
        :disabled="throwError"
        @click="handleClose(selectedUserData, false, selectedPosition)"
    />
  </template>
  <template v-else>
    <SelectType
        :dynamic-property="'name'"
        :select-placeholder="'Spieler auswählen...'"
        :hide-count="true"
        :select-name="`Neuen Position für ${selectedUser ? selectedUser?.name : 'Spieler'} auswählen`"
        :disable-placeholder-val="false"
        :select-title="'Verfügbare Spieler'"
        :select-option="filteredLineUpUser"
        :select-i-d="'lineUpFormation'"
        @update:selection="updateSelectedPlayer"
    />

    <ButtonType
      :btn-text="'Spieler tauschen'"
      :type-button="true"
      :btn-class="'w-100'"
      :disabled="throwError"
      @click="handleClose(selectedUserData,true)"
    />
  </template>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useLineUp} from "@/composables/useLineUp.ts";
import SelectType from "@/components/SelectType.vue";
import {UserData} from "@/interface";
import ButtonType from "@/components/ButtonType.vue";

const emit = defineEmits(['closeDialog'])
const throwError = ref(true)

const handleClose = (selectedUser: UserData[], isSwapping?: boolean, selectedPosition?: Object) => {
  emit('closeDialog')

  if (!throwError.value) {
    if(!isSwapping) {
      saveNewPos(selectedUser, selectedPosition)
    } else {
      saveSwappingPlayers(selectedUser)
    }
  }
}

const {
  selectedUser,
  selectedUserData,
  selectedPosition,
  filteredLineUpFormation,
  viewSelectedPlayer,
  viewSelectedPosition,
  viewSwapPlayer,
  filteredLineUpUser,
  saveSwappingPlayers,
  saveNewPos
} = useLineUp()

const updateSelectedPosition = (selectedValue: Object) => {
  selectedPosition.value = selectedValue

  /* error handling */
  throwError.value = selectedValue === 'Neue Position...';
}

const updateSelectedPlayer = (selectedValue: Object) => {
  selectedUserData.value = selectedValue

  /* error handling */
  throwError.value = selectedValue === 'Spieler auswählen...';
}
</script>

<style lang="scss" scoped>
</style>