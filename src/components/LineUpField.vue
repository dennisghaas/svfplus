<template>
  <mark>Line Up Field</mark><br />
  Line Upped Players => {{ linedUpPlayers }}<br />

  <SelectType
    :select-option="formationNav"
    :select-i-d="'select-formation'"
    :select-placeholder="'4-1-4-1'"
    :hide-count="true"
    :select-name="'select-formation'"
    :select-title="'Formation auswählen'"
    @update:selection="updateSelectedFormation"
  />

  <ul>
    <li v-for="(pos, index) in selectedFormation" :key="index">
      {{ pos.pos }}<br />
      {{ pos.isSelected }}
      <template v-if="!pos.isSelected">
        <button @click="handleAddPlayerToPosition(pos)">
          <mark>Add(+)</mark>
        </button>
      </template>
      <template v-else>
        {{ pos.user?.name || '+' }}
        <button @click="handleRemovePlayerFromPosition(pos)">
          <mark>Remove(x)</mark></button
        ><br />
        <button @click="handleAddPlayerToPosition(pos, true)">
          <mark>Switch(~)</mark></button
        ><br />
      </template>
    </li>
  </ul>

  <strong>Verfügbare Spieler:</strong>
  <ul>
    <template v-for="user in selectedUserList">
      <li v-if="!linedUpPlayers.includes(user.id)">
        <span>{{ user.name }}</span>
        <button @click="handleAddPositionToPlayer(user.id)">
          <mark>Aufstellen</mark>
        </button>
      </li>
    </template>
  </ul>

  <button type="button" @click="handleClickStepHandling('prev')">Zurück</button>
  <button type="button" @click="handleClickStepHandling('next')">Weiter</button>

  <AppDialog
    :headline="playerToPosition ? 'Spieler hinzufügen' : 'Position hinzufügen'"
    :open="dialogOpen"
    @update:open="closeAppDialog()"
  >
    <template #DialogBody>
      <LineUpDialog @close-dialog="closeAppDialog" />
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLineUp } from '@/composables/useLineUp.ts';
import {
  formationNav,
  formation_442,
  formation_4141,
  formation_443_2,
} from '@/config/formations.ts';
import SelectType from '@/components/SelectType.vue';
import { Positions } from '@/interface';
import AppDialog from '@/components/AppDialog.vue';
import LineUpDialog from '@/components/LineUpDialog.vue';

const {
  selectedUserList,
  linedUpPlayers,
  playerToPosition,
  selectedFormation,
  addPositionToPlayer,
  addPlayerToPosition,
  removePlayerFromPosition,
} = useLineUp();
selectedFormation.value = formation_4141;

const updateSelectedFormation = (formation: string) => {
  if (formation === '4-4-2') {
    selectedFormation.value = formation_442;
  } else if (formation === '4-3-3(2)') {
    selectedFormation.value = formation_443_2;
  } else {
    selectedFormation.value = formation_4141;
  }

  /* remove data from array if user switches formation */

  linedUpPlayers.value =
    []; /* maybe throw a warning if user want to change the formation (tbc) */

  selectedFormation.value.forEach((pos) => {
    if (pos) {
      pos.isSelected = false;
      pos.user = null;
    }
  });
};

const emit = defineEmits(['prev-step', 'next-step', 'closeDialog']);
const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);
  } else {
    emit('next-step', type);
  }
};

const handleAddPlayerToPosition = (pos: Positions, isSwitch?: boolean) => {
  dialogOpen.value = true;

  if (!isSwitch) {
    addPlayerToPosition(pos);
  } else {
    addPlayerToPosition(pos, true);
  }
};

const handleAddPositionToPlayer = (id: number) => {
  dialogOpen.value = true;

  addPositionToPlayer(id);
};

const handleRemovePlayerFromPosition = (pos: Positions) => {
  removePlayerFromPosition(pos);
};

/* DIALOG SETTINGS */
const dialogOpen = ref(false);
const closeAppDialog = () => {
  dialogOpen.value = false;

  /* close edit modal dialog if app dialog is closed */
  handleClose();
};

const handleClose = () => {
  emit('closeDialog');
};
</script>

<style scoped lang="scss"></style>
