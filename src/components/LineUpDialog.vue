<template>
  <template v-if="playerToPosition || switchPlayer">
    <LineUpSelectPlayers
      :select-title="'Spieler auswählen'"
      :select-id="'select-player-for-position'"
      :select-name="'select-player-for-position'"
      :select-placeholder="'Spieler auswählen...'"
      @update:selection="updateSelectedPlayer"
    />

    <ButtonType
      :disabled="forbidSaving"
      :type-button="true"
      :btn-class="'w-100'"
      :btn-text="'Speichern'"
      @click="handleSaveNewPlayer()"
    />
  </template>
  <template v-else>
    <LineUpSelectPosition
      :select-title="'Position auswählen'"
      :select-id="'select-position-for-player'"
      :select-name="'select-position-for-player'"
      :select-placeholder="'Position auswählen...'"
      @update:selection="updateSelectedPosition"
    />

    <ButtonType
      :disabled="forbidSaving"
      :type-button="true"
      :btn-class="'w-100'"
      :btn-text="'Speichern'"
      @click="handleSaveNewPosition()"
    />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLineUp } from '@/composables/useLineUp.ts';
import LineUpSelectPlayers from '@/components/LineUpSelectPlayers.vue';
import ButtonType from '@/components/ButtonType.vue';
import LineUpSelectPosition from '@/components/LineUpSelectPosition.vue';

const {
  playerToPosition,
  switchPlayer,
  selectedUserId,
  selectedPositionId,
  saveNewPlayer,
  findUserById,
  findPositionById,
  saveNewPosition,
} = useLineUp();
const forbidSaving = ref(true);

const emit = defineEmits(['closeDialog']);

const updateSelectedPlayer = (selectValue: number | string) => {
  if (selectValue === 'Spieler auswählen...') {
    forbidSaving.value = true;
  } else {
    const numericValue =
      typeof selectValue === 'string' ? parseInt(selectValue) : selectValue;

    if (!isNaN(numericValue)) {
      forbidSaving.value = false;
      selectedUserId.value = numericValue;
    }
  }
};

const updateSelectedPosition = (selectValue: number | string) => {
  if (selectValue === 'Position auswählen...') {
    forbidSaving.value = true;
  } else {
    const numericValue =
      typeof selectValue === 'string' ? parseInt(selectValue) : selectValue;

    if (!isNaN(numericValue)) {
      forbidSaving.value = false;
      selectedPositionId.value = numericValue;
    }
  }
};

const handleSaveNewPlayer = () => {
  if (!forbidSaving.value) {
    findUserById(selectedUserId.value);
    emit('closeDialog');

    if (switchPlayer.value) {
      saveNewPlayer(true);
    } else {
      saveNewPlayer(false);
    }
  }
};

const handleSaveNewPosition = () => {
  if (!forbidSaving.value) {
    findPositionById(selectedPositionId.value);
    emit('closeDialog');
    saveNewPosition();
  }
};
</script>

<style scoped lang="scss"></style>
