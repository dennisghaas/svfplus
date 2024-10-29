<template>
  Show Sub ? = {{ showSub }}

  <SelectType
      :select-name="'select-formation'"
      :select-i-d="'select-formation'"
      :select-placeholder="'4-1-4-1'"
      :select-option="formationNav"
      :hide-count="true"
      @update:selection="updateFormationSelection"
  />

  <div class="field">

    <ContentImage
        :img-alt="'ff'"
        :img-src="!isDesktop ? 'field-mobile.png' : 'field-desktop.png'"
        :img-class="`ratio ${!isDesktop ? 'ratio-9-16' : 'ratio-16-9'}`"
    />

    <LineUpField
        :positions="positions"
        :dropPlayer="dropPlayer"
        @dragenter="showSub = false"
        @removePlayer="handleRemovePlayer"
    />

    <LineUpSub
        :players="players"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {formation_4141, formation_443_2, formation_442, formationNav} from "@/config/formations.ts";
import {useBreakpoint} from "@/composables/useBreakpoint.ts";
import {Positions} from "@/interface";
import LineUpField from "@/components/LineUp/LineUpField.vue";
import LineUpSub from "@/components/LineUp/LineUpSub.vue";
import SelectType from "@/components/SelectType.vue";
import ContentImage from "@/components/ContentImage.vue";

const {isDesktop} = useBreakpoint()

const players = ref([
  {name: 'Joao', id: 1},
  {name: 'Jean', id: 2},
  {name: 'Mark', id: 3},
  {name: 'Anna', id: 4},
]);

const positions = ref<Positions[]>([]);
const showSub = ref(false);

const updateFormationSelection = (formation: string[]) => {
  if (formation.toString() === '4-4-2') {
    positions.value = formation_442
  } else if (formation.toString() === '4-3-3(2)') {
    positions.value = formation_443_2
  } else {
    /* Default */
    positions.value = formation_4141
  }
}

function loadFormation() {
  positions.value = formation_4141;
}

const dropPlayer = (event: DragEvent, position: string) => {
  const playerName = event.dataTransfer?.getData('text/plain');
  const player = players.value.find(p => p.name === playerName);

  if (player) {
    // Check if the position is already occupied
    const existingPlayer = positions.value.find(pos => pos.pos === position).player;
    if (existingPlayer) {
      console.warn(`Position ${position} is already occupied by ${existingPlayer}.`);
      return; // Exit if position is occupied
    }

    // Assign the player name and ID to the selected position
    const positionObj = positions.value.find(pos => pos.pos === position);
    if (positionObj) {
      positionObj.player = playerName;
      positionObj.id = player.id; // Assign the player's ID
      console.log(`Player ${playerName} assigned to position ${position}.`);

      // Remove the player from the available players
      players.value = players.value.filter(p => p.id !== player.id);
    }
  }
};

const handleRemovePlayer = (playerId) => {
  // Find the position that has the player ID and clear it
  const positionIndex = positions.value.findIndex(pos => pos.id === playerId);
  if (positionIndex !== -1) {
    // Clear the player from the position
    const playerToRemove = positions.value[positionIndex];
    const playerName = playerToRemove.player; // Store the name to re-add

    positions.value[positionIndex].player = '';
    positions.value[positionIndex].id = null; // Clear the ID as well

    // Re-add the player to the players array
    players.value.push({name: playerName, id: playerId});
  }
};

onMounted(() => {
  loadFormation();
});
</script>

<style scoped lang="scss">
.field {
  position: relative;
}
</style>