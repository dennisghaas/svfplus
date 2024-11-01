<template>
  <SelectType
      :select-title="'Auswählen'"
      :select-option="formationNav"
      :select-placeholder="'4-1-4-1'"
      :select-name="'Formation auswählen'"
      @update:selection="updateSelectedFormation"
  />

  <!-- add simple formation list to check if isSelected boolean will change trough dialog adjustments -->
  <ul>
    <li v-for="pos in lineUpFormation" :key="pos.id">
      <div class="d-flex">
        <div>
          {{ pos.pos }}
          {{ pos.player }}
          {{ pos.isSelected }}
          {{ pos.id }}
        </div>

        <template v-if="pos.isSelected">
          <button v-if="pos.isSelected" type="button" @click="handleSwapPlayer(pos)" style="margin-left: 20px;">
            <mark>Swap players</mark>
          </button>

          <button
              class="d-flex align-items-center"
              style="margin-left: 30px;" type="button"
              @click="removePlayerFromLineUp(pos.id)"
          >
            <i class="icon-close"></i>
            <mark>Spieler entfernen</mark>
          </button>
        </template>

        <template v-else>
          <button type="button" @click="handleLineUpSelectedPosition(pos)">
            <mark>Spieler hinzufügen</mark>
          </button>
        </template>
      </div>
    </li>
  </ul>

  <strong>Verfügbare Spieler:</strong>
  <ul>
    <template v-for="player in lineUpUser" :key="player.id">
      <li v-if="!renderSubPlayers.includes(player.id)">
        {{ player.name }} ({{player.id}})

        <button type="button" @click="handleLineUpPlayer(player)">
          <mark>Aufstellen</mark>
        </button>
      </li>
    </template>
  </ul>

  <AppDialog
      :open="dialogOpen"
      :headline="viewSelectedPlayer ? `${selectedUser?.name} aufstellen` : viewSelectedPosition ? `Neuen ${selectedPosition?.pos.toUpperCase()} hinzufügen` : viewSwapPlayer ? `${selectedPosition?.pos.toUpperCase()} tauschen` : 'Exit'"
      @update:open="closeAppDialog()"
  >
    <template #DialogBody>
      <LineUpDialog
          @close-dialog="closeAppDialog()"
      />
    </template>
  </AppDialog>


</template>

<script lang="ts" setup>
import {onMounted, watch, ref} from "vue";
import {useLineUp} from "@/composables/useLineUp.ts";
import store from "@/store";
import {formation_4141, formation_442, formation_443_2, formationNav} from "@/config/formations.ts";
import {Positions, UserData} from "@/interface";
import SelectType from "@/components/SelectType.vue";
import AppDialog from "@/components/AppDialog.vue";
import LineUpDialog from "@/components/LineUpDialog.vue";

const {
  lineUpUser,
  lineUpFormation,
  selectedUser,
  renderSubPlayers,
  viewSwapPlayer,
  viewSelectedPosition,
  viewSelectedPlayer,
  selectedUserData,
  selectedPosition,
  lineUpPlayer,
  lineUpPlayerSelectedPosition,
  removePlayerFromLineUp,
  handleUserSelection
} = useLineUp();

const props = defineProps({
  filteredUser: {
    type: Array as () => UserData[],
    default: () => []
  }
})

const updateSelectedFormation = (selectedValue: string) => {
  if (selectedValue === '4-4-2') {
    lineUpFormation.value = formation_442
  } else if (selectedValue === '4-3-3(2)') {
    lineUpFormation.value = formation_443_2
  } else {
    // back to default selection
    lineUpFormation.value = formation_4141
  }

  /* if formation is changed move all players back to sub */
  renderSubPlayers.value = []

  /* remove as well stored user */
  selectedUserData.value = []

  /* set back all data to default */
  lineUpFormation.value.forEach(pos => {
    pos.player = ''
    pos.userId = null
    pos.isSelected = false
  })
}

watch(
    () => props.filteredUser,
    (newFilteredUser) => {
      lineUpUser.value = newFilteredUser;
    },
    {immediate: true}
);

/* DIALOG */
const dialogOpen = ref(false)

const closeAppDialog = () => {
  dialogOpen.value = false

  /* close edit modal dialog if app dialog is closed */
  handleClose()

  store.updateOverflowHidden(false)
}

const emit = defineEmits(['closeDialog'])
const handleClose = () => {
  emit('closeDialog')

  /* remove dialog view handler */
  handleUserSelection()
}

const openDialog = (handleUserSelectionView: string) => {
  dialogOpen.value = true
  store.updateOverflowHidden(true)

  handleUserSelection(handleUserSelectionView)
}

const handleLineUpPlayer = (user: UserData[]) => {
  lineUpPlayer(user)
  openDialog('viewSelectedPlayer')
}

const handleLineUpSelectedPosition = (pos: Positions[]) => {
  lineUpPlayerSelectedPosition(pos)
  openDialog('viewSelectedPosition')
}

const handleSwapPlayer = (pos: Positions[]) => {
  lineUpPlayerSelectedPosition(pos)
  openDialog('viewSwapPlayer')
}

/* DIALOG === END */

onMounted(() => {
  lineUpFormation.value = formation_4141
})

</script>

<style lang="scss" scoped>
</style>