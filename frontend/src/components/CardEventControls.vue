<template>
  <nav v-if="!notNominated" class="card-body__event-controls">
    <ul class="blanklist">
      <li class="card-body__event-controls__accept">
        <button
          type="button"
          title="Zur Veranstaltung zusagen"
          :class="{ active: response?.response === 'Zusagen' }"
          @click="toggleReactionModel('Zusagen')"
        >
          <i class="icon-thumb-up"></i>
          <span class="d-none">Zur Veranstaltung zusagen</span>
        </button>
      </li>
      <li class="card-body__event-controls__decline">
        <button
          type="button"
          title="Zur Veranstaltung absagen"
          :class="{ active: response?.response === 'Absagen' }"
          @click="toggleReactionModel('Absagen')"
        >
          <i class="icon-thumb-down"></i>
          <span class="d-none">Zur Veranstaltung absagen</span>
        </button>
      </li>
      <li class="card-body__event-controls__not-sure">
        <button
          type="button"
          title="Ich bin mir unsicher"
          :class="{ active: response?.response === 'Unsicher' }"
          @click="toggleReactionModel('Unsicher')"
        >
          <i class="icon-question-mark"></i>
          <span class="d-none">Ich bin mir unsicher</span>
        </button>
      </li>
      <li class="card-body__event-controls__team-view">
        <button
          type="button"
          title="Antworten des Teams ansehen"
          @click="toggleOverviewModel()"
        >
          <i class="icon-group"></i>
          <span class="d-none">Antworten des Teams ansehen</span>
        </button>
      </li>
    </ul>
  </nav>

  <AppDialog
    :open="dialogOpen"
    :reaction-layout="reactionDialog"
    :headline="overviewDialog ? 'Übersicht: Team Reaktionen' : ''"
    @update:open="closeAppDialog()"
  >
    <template #DialogBody>
      <AppDialogReaction
        v-if="reactionDialog && !overviewDialog"
        :event-i-d="eventID"
        :reaction="getReaction"
      />
      <AppDialogEventOverview
        v-if="overviewDialog && !reactionDialog"
        :event-i-d="eventID"
        :player-with-no-access="playerWithNoAccess"
      />
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEventResponse } from '@/composables/useEventResponse.ts'
import store from '@/store'
import AppDialog from '@/components/AppDialog.vue'
import AppDialogReaction from '@/components/AppDialogReaction.vue'
import AppDialogEventOverview from '@/components/AppDialogEventOverview.vue'

const dialogOpen = ref(false)
const getReaction = ref('')
const { fetchUserResponseToEvent, getResponseForEvent } = useEventResponse()
const response = computed(() => getResponseForEvent(props.eventID))
const reactionDialog = ref(false)
const overviewDialog = ref(false)

const props = defineProps({
  notNominated: {
    type: Boolean,
    default: false,
  },
  playerWithNoAccess: {
    type: Array,
    default: () => [],
  },
  eventID: {
    type: Number,
    default: null,
  },
})

const toggleReactionModel = (reaction: string) => {
  reactionDialog.value = true
  dialogOpen.value = true
  getReaction.value = reaction

  store.updateOverflowHidden(true)
}

const toggleOverviewModel = () => {
  overviewDialog.value = true
  dialogOpen.value = true

  store.updateOverflowHidden(true)
}

const closeAppDialog = () => {
  reactionDialog.value = false
  overviewDialog.value = false

  dialogOpen.value = false

  /* close edit modal dialog if app dialog is closed */
  handleClose()
}

const emit = defineEmits(['closeDialog'])
const handleClose = () => {
  emit('closeDialog')
}

onMounted(() => {
  fetchUserResponseToEvent(props.eventID)
})
</script>

<style scoped lang="scss">
.card-body__event-controls {
  width: calc(100% + #{rem(40px)});
  margin: rem(15px) #{rem(-20px)} #{rem(-15px)};
  position: relative;

  ul {
    display: flex;

    li {
      width: 25%;
      max-width: 25%;

      button {
        display: flex;
        justify-content: center;
        padding: rem(15px);
        width: 100%;
        transition: $transition-fast;

        &:hover {
          color: var(--white);
        }
      }
    }
  }

  &__accept {
    button {
      &:hover,
      &.active {
        background: var(--success-light);
        color: var(--white);
      }
    }
  }

  &__decline {
    button {
      &:hover,
      &.active {
        background: var(--primary);
        color: var(--white);
      }
    }
  }

  &__not-sure,
  &__team-view {
    button {
      &:hover,
      &.active {
        background: var(--gray-dark);
        color: var(--white);
      }
    }
  }
}
</style>
