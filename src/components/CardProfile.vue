<template>
  <CardFrame :card-header-b-g="'bg-gray-dark'" :card-layout-alt="true">
    <template #cardHeaderLeft>
      <div class="row">
        <div class="card-header-profile">
          <ProfilePanel
            :bg-color="bgColor"
            :user-initials="initials"
            :hide-initials="hideInitials"
            :add-border="true"
            :is-image="!bgColor.includes('--')"
          />

          <div class="card-header-profile--content">
            <h4>{{ title }}</h4>
          </div>
        </div>
      </div>
    </template>

    <template #cardHeaderRight>
      <LinkType
        v-if="store.state.isSergeant || isCurrentUsersProfile"
        :btn-class="'text-color-white'"
        :btn-text="isMobile ? '' : 'Bearbeiten'"
        :btn-icon="'icon-edit'"
        @click="toggleDialog()"
      />
    </template>

    <template #cardBody>
      <div class="card-body-profile">
        <h3>Profildaten</h3>

        <div class="card-body-profile--item">
          <span class="typo-label"> Rolle </span>
          <span class="text-right">
            {{ resolveRole(subtitle) }}
          </span>
        </div>

        <div class="card-body-profile--item">
          <span class="typo-label"> Name </span>
          <span> {{ name }} {{ surname }} </span>
        </div>

        <div
          v-if="store.state.isMajor || isCurrentUsersProfile"
          class="card-body-profile--item"
        >
          <span class="typo-label"> E-Mail </span>
          <span>
            {{ email }}
          </span>
        </div>

        <div class="card-body-profile--item">
          <span class="typo-label"> Position </span>
          <span>
            <template v-if="!position || position === ''"> k.A. </template>
            <template v-else>
              {{ position }}
            </template>
          </span>
        </div>

        <div class="card-body-profile--item">
          <span class="typo-label"> Spielernummer </span>
          <span v-if="handleJerseyNumber(jerseyNumber) === 0"> k.A. </span>
          <span v-else>
            {{ handleJerseyNumber(jerseyNumber) }}
          </span>
        </div>

        <div class="card-body-profile--item">
          <span class="typo-label"> Geburtstag </span>
          <span
            v-if="
              `${formattedDate?.day}.${formattedDate?.month}.${formattedDate?.year}` ===
              '01.01.1955'
            "
          >
            k.A.
          </span>
          <span v-else>
            {{ formattedDate?.day }}.{{ formattedDate?.month }}.{{
              formattedDate?.year
            }}
          </span>
        </div>

        <div class="card-body-profile--item">
          <span class="typo-label"> Trainingsanzug bekommen? </span>
          <span>
            {{ handleSuit(gotSuit) }}
          </span>
        </div>

        <div
          v-if="store.state.isSergeant || isCurrentUsersProfile"
          class="card-body-profile--item"
        >
          <span class="typo-label"> Offener betrag mannschaftskasse </span>
          <span v-if="role.includes('Trainer')"> Befreit </span>
          <span v-else> {{ debts.toFixed(2) }}&nbsp;€ </span>
        </div>
      </div>

      <div v-if="isInjured" class="card-body-profile--injured">
        <BadgeType
          :badge-type="'injured'"
          :badge-text="
            isInjuredType ? `Verletzt: ${isInjuredType}` : `Verletzt`
          "
        />
      </div>
    </template>
  </CardFrame>

  <AppDialog
    :open="dialogOpen"
    :reaction-layout="false"
    :headline="`Profil von ${name} bearbeiten`"
    @update:open="closeAppDialog()"
  >
    <template #DialogBody>
      <AppDialogSingleUser
        :id="id"
        :is-current-users-profile="isCurrentUsersProfile"
      />
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { resolveRole } from '@/helpers/resolveRole.ts';
import { formatDate } from '@/helpers/formatDate.ts';
import { handleJerseyNumber } from '@/helpers/handleJerseyNumber.ts';
import { handleSuit } from '@/helpers/handleSuit.ts';
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import CardFrame from '@/components/CardFrame.vue';
import BadgeType from '@/components/BadgeType.vue';
import ProfilePanel from '@/components/ProfilePanel.vue';
import LinkType from '@/components/LinkType.vue';
import AppDialog from '@/components/AppDialog.vue';
import store from '@/store';
import AppDialogSingleUser from '@/components/AppDialogSingleUser.vue';

const { isMobile } = useBreakpoint();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  surname: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: '',
  },
  jerseyNumber: {
    type: Number,
    default: null,
  },
  birthday: {
    type: Date,
    default: new Date(),
  },
  gotSuit: {
    type: Boolean,
    default: false,
  },
  debts: {
    type: Number,
    default: 0,
  },
  id: {
    type: Number,
    default: 0,
  },
  isInjured: {
    type: Boolean,
    default: false,
  },
  isInjuredType: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: '',
  },
  initials: {
    type: String,
    default: '',
  },
  hideInitials: {
    type: Boolean,
    default: false,
  },
  isCurrentUsersProfile: {
    type: Boolean,
    default: false,
  },
});

const formattedDate = computed(() => {
  return formatDate(props.birthday);
});

/* DIALOG */
const dialogOpen = ref(false);

const closeAppDialog = () => {
  dialogOpen.value = false;

  /* close edit modal dialog if app dialog is closed */
  handleClose();
};

const emit = defineEmits(['closeDialog']);
const handleClose = () => {
  emit('closeDialog');
};

const toggleDialog = () => {
  dialogOpen.value = true;
  store.updateOverflowHidden(true);
};
</script>

<style scoped lang="scss">
.card-header-profile {
  display: flex;
  align-items: center;
  gap: rem(20px);
}

.card-body-profile {
  h3,
  .h3 {
    margin-bottom: rem(20px);
  }

  &--item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(15px) 0;
    border-bottom: 1px solid var(--border-color);

    .typo-label {
      margin-bottom: 0;
    }

    &:nth-child(2) {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  &--injured {
    margin-bottom: 0;

    .badge {
      justify-content: center;
      margin-top: rem(30px);
      margin-bottom: 0;
    }
  }
}
</style>
