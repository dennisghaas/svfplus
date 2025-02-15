<template>
  <SelectType
    v-if="!isMobile"
    :select-option="updatedFormationNav"
    :select-i-d="'select-formation'"
    :select-placeholder="!isExistingLineUp ? '4-1-4-1' : selectedFormationValue"
    :hide-count="true"
    :disable-placeholder-val="true"
    :select-name="'select-formation'"
    @update:selection="updateSelectedFormation"
  />

  <div class="lineup__field">
    <div class="lineup__field-content">
      <SelectType
        v-if="isMobile"
        :select-option="updatedFormationNav"
        :select-i-d="'select-formation'"
        :select-placeholder="
          !isExistingLineUp ? '4-1-4-1' : selectedFormationValue
        "
        :hide-count="true"
        :select-name="'select-formation'"
        :dark-u-i="true"
        @update:selection="updateSelectedFormation"
      />

      <ul
        :class="[
          'lineup__field-formation',
          'blanklist',
          { 'lineup__field-formation--tooltip-open': tooltipIsOpen },
        ]"
      >
        <li
          :class="[
            'lineup__field__pos-item',
            pos.x,
            pos.y,
            {
              'lineup__field__pos-item--tooltip-selected': tooltipOpen[index],
            },
          ]"
          v-for="(pos, index) in selectedFormation"
          :key="index"
        >
          <ProfilePanel
            :add-border="true"
            :is-add-button="!pos.isSelected"
            :bg-color="
              pos.isSelected ? pos.user?.userImage.bgColor : '--primary'
            "
            :user-initials="pos.isSelected ? pos.user?.userImage.initials : ''"
            :hide-initials="pos.user?.userImage.hideInitials"
            :is-image="
              pos.isSelected
                ? !pos.user?.userImage.bgColor.includes('--')
                : false
            "
          />

          <span
            :class="[
              'lineup__field__pos-item_pos',
              { 'lineup__field__pos-item_pos--selected': pos.isSelected },
              {
                'lineup__field__pos-item_pos--unsure':
                  selectedUserListEventResponse(pos.user?.id) === 'Unsicher',
              },
            ]"
          >
            {{ pos.pos }}
            <template
              v-if="selectedUserListEventResponse(pos.user?.id) !== undefined"
            >
              <template
                v-if="selectedUserListEventResponse(pos.user?.id) === 'Zusagen'"
              >
                <i class="icon-thumb-up"></i>
              </template>
              <template v-else>
                <i class="icon-question-mark"></i>
              </template>
            </template>
          </span>

          <div class="lineup__field__pos-button">
            <button
              type="button"
              @click="
                !pos.isSelected
                  ? handleAddPlayerToPosition(pos)
                  : handleToggleTooltip(index)
              "
            >
              <span class="d-none">
                {{
                  !pos.isSelected ? 'Spieler hinzufügen' : 'Position bearbeiten'
                }}
              </span>
            </button>
          </div>

          <div
            v-if="tooltipOpen[index]"
            :class="['lineup__field__pos-tooltip', tooltipAlignment(pos.x)]"
          >
            <ul class="blanklist">
              <li class="lineup__field__pos-tooltip--remove">
                <button
                  type="button"
                  @click="handleRemovePlayerFromPosition(pos)"
                >
                  <i class="icon-close"> </i>
                  <span class="d-none">Spieler entfernen</span>
                </button>
              </li>
              <li class="lineup__field__pos-tooltip--switch">
                <button
                  type="button"
                  @click="handleAddPlayerToPosition(pos, true)"
                >
                  <i class="icon-switch"> </i>
                  <span class="d-none">Spieler austauschen</span>
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <ContentImage
      :img-alt="'field'"
      :img-src="isMobile ? 'field-mobile.webp' : 'field-desktop.webp'"
      :class="`lineup__field-background ratio ${isMobile ? 'ratio-9x16' : ''}`"
    />
  </div>

  <LineUpCard :headline="'Bank'">
    <template #layoutDefaultContent>
      <ul class="lineup__sub blanklist">
        <template v-for="user in selectedUserList">
          <li
            v-if="
              !linedUpPlayers.includes(user.id) &&
              !notNominatedPlayers.includes(user.id)
            "
          >
            <div
              :class="[
                'lineup__sub-icon',
                {
                  'lineup__sub-icon--unsure':
                    selectedUserListEventResponse(user.id) === 'Unsicher',
                },
              ]"
            >
              <template
                v-if="selectedUserListEventResponse(user.id) === 'Zusagen'"
              >
                <i class="icon-thumb-up"></i>
              </template>
              <template v-else>
                <i class="icon-question-mark"></i>
              </template>
            </div>
            <span class="text-color-black-75"
              >{{ textTruncate(`${user.name}`, 10, 10) }}
              <strong>{{
                textTruncate(`${user.surname}`, 10, 10)
              }}</strong></span
            >
            <ButtonType
              :btn-class="'btn-small w-auto'"
              :btn-text="'Aufstellen'"
              :type-button="true"
              @click="handleAddPositionToPlayer(user.id)"
            />
          </li>
        </template>
      </ul>
    </template>
  </LineUpCard>

  <BadgeType
    v-if="linedUpPlayers.length < 11"
    :badge-type="'warning'"
    :badge-text="'Die Aufstellung ist noch nicht komplett'"
    :badge-centered="true"
    :badge-alt="isMobile"
    :additional-class="'event'"
  />

  <ButtonWrapper :align-as-row="!isMobile">
    <template #buttons>
      <ButtonType
        :btn-text="'Zurück'"
        :btn-class="'btn-secondary w-100'"
        :type-button="true"
        @click="handleClickStepHandling('prev')"
      />

      <!--  :disabled="linedUpPlayers.length < 11" -->

      <ButtonType
        :btn-text="'Weiter'"
        :btn-class="'w-100 w'"
        :type-button="true"
        @click="handleClickStepHandling('next')"
      />
    </template>
  </ButtonWrapper>

  <AppDialog
    :headline="
      playerToPosition
        ? 'Spieler hinzufügen'
        : switchPlayer
          ? 'Spieler austauschen'
          : 'Position hinzufügen'
    "
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
import { useLineUpResponses } from '@/composables/useLineUpResponses.ts';
import { textTruncate } from '@/helpers/textTruncate';
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import {
  formationNav,
  formation_442,
  formation_4141,
  formation_443_2,
  formation_4231,
} from '@/config/formations.ts';
import SelectType from '@/components/SelectType.vue';
import { Positions } from '@/interface';
import AppDialog from '@/components/AppDialog.vue';
import LineUpDialog from '@/components/LineUpDialog.vue';
import ButtonType from '@/components/ButtonType.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import ContentImage from '@/components/ContentImage.vue';
import ProfilePanel from '@/components/ProfilePanel.vue';
import LineUpCard from '@/components/LineUpCard.vue';
import BadgeType from '@/components/BadgeType.vue';

const { isMobile } = useBreakpoint();

const {
  selectedUserList,
  linedUpPlayers,
  playerToPosition,
  selectedFormation,
  switchPlayer,
  selectedFormationValue,
  notNominatedPlayers,
  addPositionToPlayer,
  addPlayerToPosition,
  removePlayerFromPosition,
  selectedUserListEventResponse,
} = useLineUp();

const { isExistingLineUp, updatedFormationNav } = useLineUpResponses();

const handleSelectionAlignment = (formation: string) => {
  const index = updatedFormationNav.value.indexOf(formation);

  if (index !== -1) {
    updatedFormationNav.value.splice(index, 1);
    updatedFormationNav.value.unshift(formation);
  }
};

const handleFormationNav = () => {
  updatedFormationNav.value = formationNav;

  if (isExistingLineUp.value) {
    handleSelectionAlignment(selectedFormationValue.value);
  } else {
    handleSelectionAlignment('4-1-4-1');
  }
};

handleFormationNav();

/* default values for formation | check if data comes from api */
if (!isExistingLineUp.value) {
  selectedFormation.value = formation_4141;
  selectedFormationValue.value = '4-1-4-1';
}

const tooltipOpen = ref<boolean[]>(Array(11).fill(false));
const tooltipIsOpen = ref(false);

const updateSelectedFormation = (formation: string) => {
  if (formation === '4-4-2') {
    selectedFormation.value = formation_442;
  } else if (formation === '4-3-3(2)') {
    selectedFormation.value = formation_443_2;
  } else if (formation === '4-2-3-1') {
    selectedFormation.value = formation_4231;
  } else {
    selectedFormation.value = formation_4141;
  }

  /* remove data from array if user switches formation */
  linedUpPlayers.value = [];

  selectedFormation.value.forEach((pos) => {
    if (pos) {
      pos.isSelected = false;
      pos.user = null;
    }
  });

  /* set open tooltip back to false */
  tooltipOpen.value = tooltipOpen.value.map(() => false);

  /* assign formation string to value for api controlling */
  selectedFormationValue.value = formation;
};

const emit = defineEmits(['prev-step', 'next-step', 'closeDialog']);
const handleClickStepHandling = (type: string) => {
  if (type === 'prev') {
    emit('prev-step', type);

    /* set back to default formation */
    if (selectedFormation.value !== formation_4141) {
      selectedFormation.value = formation_4141;
    }

    /* remove data from array if user switches formation */
    linedUpPlayers.value = [];
    selectedFormation.value.forEach((pos) => {
      if (pos) {
        pos.isSelected = false;
        pos.user = null;
      }
    });

    /* set open tooltip back to false */
    tooltipOpen.value = tooltipOpen.value.map(() => false);

    /* clean selected user list */
    selectedUserList.value = [];
  } else {
    emit('next-step', type);
  }
};

const handleAddPlayerToPosition = (pos: Positions, isSwitch?: boolean) => {
  dialogOpen.value = true;

  /* remove state from tooltip */
  tooltipOpen.value = tooltipOpen.value.map(() => false);
  tooltipIsOpen.value = false;

  if (!isSwitch) {
    addPlayerToPosition(pos);
  } else {
    addPlayerToPosition(pos, true);
  }
};

const handleAddPositionToPlayer = (id: number) => {
  dialogOpen.value = true;

  /* remove state from tooltip */
  tooltipOpen.value = tooltipOpen.value.map(() => false);
  tooltipIsOpen.value = false;

  addPositionToPlayer(id);
};

const handleRemovePlayerFromPosition = (pos: Positions) => {
  removePlayerFromPosition(pos);

  /* remove state from tooltip */
  tooltipOpen.value = tooltipOpen.value.map(() => false);
  tooltipIsOpen.value = false;
};

const handleToggleTooltip = (index: number) => {
  if (tooltipOpen.value[index]) {
    tooltipOpen.value[index] = false;
    tooltipIsOpen.value = false;
  } else {
    tooltipOpen.value = tooltipOpen.value.map(() => false);
    tooltipOpen.value[index] = true;
    tooltipIsOpen.value = true;
  }
};

const tooltipAlignment = (alignment: string) => {
  if (alignment === 'right') {
    return 'lineup__field__pos-tooltip--align-left';
  }
};

/* DIALOG SETTINGS */
const dialogOpen = ref(false);
const closeAppDialog = () => {
  dialogOpen.value = false;

  /* close edit modal dialog if app dialog is closed */
  handleClose();

  /* scroll to top if dialog is closed */
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

const handleClose = () => {
  emit('closeDialog');
};
</script>

<style scoped lang="scss">
.lineup {
  &__field {
    display: flex;
    position: relative;
    margin: calc(#{-$pageHeaderHeight} + rem(-40px)) 0 rem(40px) 0;
    width: calc(100% + #{$gutter-width * 4});
    left: -#{$gutter-width * 2};
    color: var(--white);

    @include media-breakpoint-up(sm) {
      flex-direction: column;
      aspect-ratio: 16 / 9;
      margin: 0 0 rem(40px);
    }

    &-content {
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      padding: calc(#{$pageHeaderHeight} + rem(40px)) rem(20px) 0;

      @include media-breakpoint-up(sm) {
        position: relative;
        padding: 0;
      }
    }

    &-background {
      position: relative;
      z-index: 1;

      @include media-breakpoint-up(sm) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    &-formation {
      position: relative;
      height: 100%;

      &--tooltip-open {
        .lineup__field__pos-item {
          z-index: 0;
          filter: blur(1px);

          &--tooltip-selected {
            z-index: 1;
            filter: blur(0);
          }
        }
      }
    }

    &__pos {
      &-item {
        position: absolute;
        width: max-content;
        transition: $transition-base;

        &_pos {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          gap: 0.25rem;
          top: calc(100% - #{rem(10px)});
          left: 0;
          width: 100%;
          background: var(--black);
          text-align: center;
          text-transform: uppercase;
          font-size: $font-size-10;
          padding: rem(3px) rem(10px);
          border-radius: rem(5px);
          color: var(--primary);

          &--selected {
            color: var(--success-light);
          }

          &--unsure {
            color: var(--white-75);
          }

          [class*='icon-'] {
            font-size: rem(8px);
          }
        }

        &.left {
          left: 0;

          @include media-breakpoint-up(sm) {
            &.fb {
              left: 15%;
            }

            &.winger {
              left: 20%;
            }
          }
        }

        &.center {
          left: 50%;
          transform: translateX(-50%);

          &.center-left {
            left: 33.3%;
          }

          &.center-right {
            left: 66.6%;
          }
        }

        &.right {
          right: 0;

          @include media-breakpoint-up(sm) {
            &.fb {
              right: 15%;
            }

            &.winger {
              right: 20%;
            }
          }
        }

        &.gk {
          bottom: 10%;
        }

        &.cb {
          bottom: 25%;
        }

        &.fb {
          bottom: 35%;

          &.fb-top {
            bottom: 40%;
          }
        }

        &.cdm {
          bottom: 40%;

          &.cdm-top {
            bottom: 45%;
          }
        }

        &.cm {
          bottom: 55%;

          &.cm-top {
            bottom: 60%;
          }
        }

        &.com {
          bottom: 70%;

          &.com-top {
            bottom: 75%;
          }
        }

        &.winger {
          bottom: 70%;

          &.winger-top {
            bottom: 75%;
          }
        }

        &.st {
          bottom: 85%;
        }
      }

      &-button {
        button {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      &-tooltip {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &:not(.lineup__field__pos-tooltip--align-left) {
          left: 100%;
          margin-left: rem(10px);
        }

        li {
          width: rem(50px);
          height: rem(50px);
          margin-bottom: rem(10px);

          > button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: var(--black);
            box-shadow: $box-shadow-default;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        &--remove {
          color: var(--primary);

          [class*='icon-'] {
            font-size: $font-size-14;
          }
        }

        &--switch {
          color: var(--warning-light);
        }

        &--exchange {
          color: var(--success-light);
        }

        &--align-left {
          right: 100%;
          margin-right: rem(10px);
        }
      }
    }
  }

  &__sub {
    li {
      display: flex;
      align-items: center;
      margin-bottom: rem(10px);
      padding-bottom: rem(10px);
      border-bottom: 1px solid var(--gray-soft);

      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
      }

      span {
        width: 100%;
        font-size: $font-size-16;
      }
    }

    &-icon {
      background: var(--success-light);
      font-size: $font-size-10;
      color: var(--white);
      padding: rem(7.5px);
      border-radius: 50%;
      margin-right: rem(5px);

      &--unsure {
        background: var(--gray-dark);
      }
    }

    @include media-breakpoint-up(md) {
      display: flex;
      flex-wrap: wrap;

      li {
        border: 0;
        gap: rem(10px);
        width: calc(50% - #{rem(20px)});
        max-width: calc(50% - #{rem(20px)});
        margin: 0 rem(20px) 0 0;
        padding: rem(10px) rem(20px) rem(10px) 0;
        position: relative;

        &::after {
          content: '';
          width: 1px;
          height: rem(30px);
          background: var(--border-color);
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          display: block;
        }
      }
    }

    @include media-breakpoint-between(md, xl) {
      li {
        &:nth-child(even) {
          &::after {
            display: none;
          }
        }
      }
    }

    @include media-breakpoint-up(xl) {
      li {
        width: calc(25% - #{rem(20px)});
        max-width: calc(25% - #{rem(20px)});

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
