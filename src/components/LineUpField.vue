<template>
  <div class="field">
    <div class="field__content">
      <SelectType
          class="field__select"
          :select-title="''"
          :select-option="formationNav"
          :select-placeholder="'4-1-4-1'"
          :select-name="'Formation auswählen'"
          :theme-dark="true"
          @update:selection="updateSelectedFormation"
      />
      <ul class="field__lineup blanklist">
        <li v-for="(pos, index) in lineUpFormation" :key="pos.id"
            :class="['field__lineup_pos', pos.y, pos.x]">

          <button
              class="field__lineup_pos__button"
              type="button"
              @click="!pos.isSelected ? handleLineUpSelectedPosition(pos) : handleShowControls(index)">
            <ProfilePanel
                :bg-color="pos.isSelected ? pos.user.userImage.bgColor : '--primary'"
                :user-initials="pos.isSelected ? pos.user.userImage.initials : ''"
                :is-image="pos.isSelected ? !pos.user.userImage.bgColor.includes('--') : false"
                :add-border="true"
                :is-add-button="!pos.isSelected"
            />
          </button>

          <div
              :class="['field__lineup_pos__info', getResponse(pos.userId) !== 'Zusagen' ?  pos.isSelected ? 'field__lineup_pos__info--disabled' : 'test' : 'field__lineup_pos__info--selected']">
            <span>{{ pos.pos }}
              <template v-if="pos.isSelected">
                <i :class="getResponse(pos.userId) === 'Zusagen' ? 'icon-thumb-up' : 'icon-question-mark'"></i>
              </template>
            </span>
          </div>

          <div v-if="showControls[index]" :class="['field__lineup_pos__controls', controlAlignment(pos.x)]">
            <button class="field__lineup_pos__controls-delete" type="button"
                    @click="removePlayerFromLineUp(pos.id, index)">
              <i class="icon-close"></i>
            </button>

            <button class="field__lineup_pos__controls-exchange" type="button" @click="handleSwapPlayer(pos)">
              <i class="icon-exchange"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="field__sub">
      <button
          :class="[
              'field__sub-headline', { 'field__sub-headline--open' : showSub }]"
          @click="handleShowSub()">
        <span>Bank</span>
        <i class="icon-chevron-down"></i>
      </button>
      <div v-if="showSub" class="field__sub-content">
        <ul class="blanklist">
          <template v-for="player in lineUpUser" :key="player.id">
            <li v-if="!renderSubPlayers.includes(player.id)">
              <button type="button" @click="handleLineUpPlayer(player)">
                <ProfilePanel
                    :add-border="true"
                    :display-medium="true"
                    :user-initials="player.userImage.initials"
                    :bg-color="player.userImage.bgColor"
                    :is-image="!player.userImage.bgColor.includes('--')"
                />
              </button>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <ContentImage
        :img-class="'ratio ratio-9-16 field__image'"
        :img-alt="'field'"
        :img-src="'field-mobile.jpg'"
    />

  </div>

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
import {onMounted, watch, ref, computed} from "vue";
import {useLineUp} from "@/composables/useLineUp.ts";
import store from "@/store";
import {formation_4141, formation_442, formation_443_2, formationNav} from "@/config/formations.ts";
import {EventResponse, Positions, UserData} from "@/interface";
import SelectType from "@/components/SelectType.vue";
import AppDialog from "@/components/AppDialog.vue";
import LineUpDialog from "@/components/LineUpDialog.vue";
import ContentImage from "@/components/ContentImage.vue";
import ProfilePanel from "@/components/ProfilePanel.vue";

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
  showControls,
  eventResponses,
  showSub,
  lineUpPlayer,
  lineUpPlayerSelectedPosition,
  removePlayerFromLineUp,
  handleUserSelection,
  handleShowControls,
  handleShowSub
} = useLineUp();

const props = defineProps({
  filteredUser: {
    type: Array as () => UserData[],
    default: () => []
  },
  getEventResponses: {
    type: Array as () => EventResponse[],
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

const controlAlignment = (xValue: string) => {
  if (xValue === 'right') {
    return 'field__lineup_pos__controls--align-left'
  } else {
    return 'field__lineup_pos__controls--align-right'
  }
}

/* get as well all event responses to check the status of the reaction */
watch(
    () => [props.filteredUser, props.getEventResponses],
    ([newFilteredUser, newEventResponses]) => {
      lineUpUser.value = newFilteredUser;
      eventResponses.value = newEventResponses
    },
    {immediate: true}
);

const getResponse = (playerId: number) => {
  const response = eventResponses.value.find(response =>
      response.userId === playerId && ['Zusagen', 'Unsicher'].includes(response.response)
  );
  return response ? response.response : null;
};

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
.field {
  /* offset padding top */
  margin-top: calc(#{-$pageHeaderHeight} + rem(-40px));
  padding-top: calc(#{$pageHeaderHeight} + rem(40px));

  /* styling for component*/
  position: relative;
  aspect-ratio: 9 / 16;
  width: calc(100% + #{$gutter-width * 4});
  left: -#{$gutter-width * 2};

  &__select {
    position: absolute;
    top: 0;
    width: calc(100% - #{$gutter-width * 4});
    margin: 0;
    z-index: 2;
  }

  &__content {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 0 #{$gutter-width * 2} #{$gutter-width * 2};
  }

  &__image {
    position: absolute;
    height: 100%;
    top: 0;
  }

  &__lineup {
    color: var(--white);
    position: relative;
    height: 100%;

    &_pos {
      position: absolute;
      max-width: max-content;
      margin-bottom: rem(11px);
      transition: $transition-base;

      /* x position values */
      &.center {
        left: 50%;
        transform: translateX(-50%);

        &.center-right {
          left: 75%
        }

        &.center-left {
          left: 25%
        }
      }

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }

      /* y position values */
      &.gk {
        bottom: 0;
      }

      &.cb {
        bottom: 15%;
      }

      &.fb {
        bottom: 25%;
      }

      &.cdm {
        bottom: 30%;
      }

      &.cm {
        bottom: 40%;
      }

      &.winger {
        bottom: 50%;

        &.winger-top {
          bottom: 60%;
        }
      }

      &.st {
        bottom: 65%;
      }

      &__info {
        text-align: center;
        text-transform: uppercase;
        font-size: 10px;
        font-weight: 500;
        background: var(--black);
        border-radius: 5px;
        padding: 3px;
        bottom: -10px;
        position: absolute;
        width: 100%;
        color: var(--primary);

        > span {
          display: flex;
          align-items: center;
          justify-content: center;

          [class*="icon-"] {
            font-size: rem(8px);
            margin-left: .25rem;
          }
        }

        &--selected {
          color: var(--success-light);
        }

        &--disabled {
          color: var(--white-75);
        }
      }

      &__controls {
        display: flex;
        flex-direction: column;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        gap: rem(5px);

        &--align-right {
          left: calc(100% + #{rem(10px)});
        }

        &--align-left {
          right: calc(100% + #{rem(10px)});
        }

        > button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--black);
          width: rem(50px);
          height: rem(50px);
        }

        &-delete {
          color: var(--primary);

          [class*="icon-"] {
            font-size: $font-size-14;
          }
        }

        &-exchange {
          color: var(--success-light);
        }
      }
    }
  }

  &__sub {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -1px;
    left: 0;
    z-index: 1;
    width: 100%;

    &-headline {
      color: var(--white);
      background: var(--success-very-dark);
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px;
      max-width: max-content;
      border-radius: 0 10px 0 0;
      gap: 10px;
      position: relative;

      &.field__sub-headline--open {
        [class*="icon-"] {
          transform: rotate(-180deg);
        }
      }

      &::before {
        content: '';
        height: 1px;
        width: calc(100% - 40px);
        position: absolute;
        left: 20px;
        bottom: 0;
        background: var(--white-50);
        z-index: 1;
      }

      [class*="icon-"] {
        font-size: $font-size-14;
      }
    }

    &-content {
      padding: rem(20px);
      background: var(--success-very-dark);

      ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: rem(10px)
      }
    }
  }

  @include media-breakpoint-up(lg) {
    margin-top: rem(-40px);
  }
}
</style>