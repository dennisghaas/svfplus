<template>
  <div class="edit-mode-dialog">
    <button
        class="edit-mode-dialog__close"
        type="button"
        title="Bearbeitungsmodus schließen"
        @click="handleClose()"
    >
      <i class="icon-close"></i>
      <span class="d-none"> Bearbeitungsmodus schließen </span>
    </button>

    <div class="edit-mode-dialog__headline text-center">
      <h4>
        {{ dialogHeadline }}
      </h4>
    </div>

    <div class="edit-mode-dialog__content">
      <template v-if="!showAreYouSure">
        <AppButton
            :label="'Bearbeiten'"
            :additional-class="'bg-blue-light text-color-blue-dark-gray'"
            :icon="'icon-edit'"
            :show-label="true"
            @click="handleEdit()"
        />
        <!-- Edit will trigger the fullwidth content width dialog (tbc) -->

        <AppButton
            :label="'Löschen'"
            :additional-class="'bg-primary text-color-white'"
            :icon="'icon-trash'"
            :show-label="true"
            @click="handleEventDeletion()"
        />
      </template>
      <template v-else>
        <template v-if="isTraining && !isTrainingAreYouSure">
          <AppButton
              :label="'Dieses Training'"
              :additional-class="'bg-primary text-color-white'"
              :icon="'icon-single'"
              :show-label="true"
              @click="deleteThisEvent()"
          />

          <AppButton
              :label="'Dauerauftrag'"
              :additional-class="'bg-primary text-color-white'"
              :icon="'icon-multiple'"
              :show-label="true"
              @click="deleteStandingOrder()"
          />
        </template>
        <template v-else-if="isTraining && isTrainingAreYouSure">
          <AppButton
              :label="'Nope'"
              :additional-class="'bg-success-light text-color-success-dark'"
              :icon="'icon-close'"
              :show-label="true"
              @click="handleMisclicked()"
          />
          <AppButton
              :label="'Jup'"
              :additional-class="'bg-primary text-color-white'"
              :icon="'icon-trash'"
              :show-label="true"
              @click="removeStandingOrderFromApi(router)"
          />
        </template>
        <template v-else>
          <AppButton
              :label="'Nope'"
              :additional-class="'bg-success-light text-color-success-dark'"
              :icon="'icon-close'"
              :show-label="true"
              @click="handleMisclicked()"
          />

          <AppButton
              :label="'Jup'"
              :additional-class="'bg-primary text-color-white'"
              :icon="'icon-trash'"
              :show-label="true"
              @click="deleteEventById(eventId, router, eventType)"
          />
        </template>
      </template>
    </div>
  </div>

  <AppDialog
      :headline="'Event bearbeiten'"
      :open="dialogOpen"
      @update:open="closeAppDialog()"
  >
    <template #DialogBody>
      <AppDialogEvent :event-i-d="eventId" :event-type="eventType"/>
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useEvents} from '@/composables/useEvents.ts'
import {useRouter} from 'vue-router'
import store from '@/store'
import AppButton from '@/components/AppButton.vue'
import AppDialog from '@/components/AppDialog.vue'
import AppDialogEvent from '@/components/AppDialogEvent.vue'

const router = useRouter()
const showAreYouSure = ref(false)
const isTrainingAreYouSure = ref(false)
const dialogHeadline = ref('Bearbeitungsmodus')
const {
  deleteEventById,
  fetchStandingOrderResponse,
  fetchEventsByID,
  deleteStandingOrderById,
  standingOrderArray,
  selectedEvent,
} = useEvents()

const props = defineProps({
  eventId: {
    type: Number,
    default: 0,
  },
  eventType: {
    type: String,
    default: '',
  },
})

const isTraining = ref(props.eventType === 'Training')

/* dialog step function */
const handleEventDeletion = () => {
  showAreYouSure.value = true
  dialogHeadline.value = isTraining.value
      ? 'Event oder Dauerauftrag löschen?'
      : 'Event wirklich löschen?'
}

const handleMisclicked = () => {
  showAreYouSure.value = false
  isTrainingAreYouSure.value = false
  dialogHeadline.value = 'Bearbeitungsmodus'
  isTraining.value = props.eventType === 'Training'
}

const deleteThisEvent = () => {
  isTraining.value = false
}

const deleteStandingOrder = () => {
  isTrainingAreYouSure.value = !isTrainingAreYouSure.value
}

const removeStandingOrderFromApi = async (router: any) => {
  const thisStandingOrderID = selectedEvent.value[0].standingOrderID;
  const thisStandingOrderArray = standingOrderArray.value.filter(
      (standingOrder) => standingOrder.id === thisStandingOrderID,
  )[0];

  if (!thisStandingOrderArray) {
    throw new Error('Standing order not found');
  }
  const thisStandingOrderEvents = thisStandingOrderArray.eventIDs;
  await deleteStandingOrderById(thisStandingOrderID);

  await deleteEventById(
      props.eventId,
      router,
      props.eventType,
      thisStandingOrderEvents,
  );
};

const dialogOpen = ref(false)
const handleEdit = () => {
  dialogOpen.value = true
  store.updateOverflowHidden(true)
}

const closeAppDialog = () => {
  dialogOpen.value = false

  /* close edit modal dialog if app dialog is closed */
  handleClose()
}

/* emit close */
const emit = defineEmits(['closeDialog'])
const handleClose = () => {
  emit('closeDialog')
}

onMounted(() => {
  if (isTraining.value) {
    fetchStandingOrderResponse()
  }

  fetchEventsByID(props.eventId)
})
</script>

<style scoped lang="scss">
.edit-mode-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  position: absolute;
  top: rem(20px);
  left: rem(20px);
  background: var(--blue-dark-gray);
  width: calc(100% - #{rem(40px)});
  color: var(--white);
  padding: rem(20px) 2rem;
  border-radius: rem(10px);
  height: calc(100% - #{rem(40px)});

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -1rem;
    right: -1rem;
    padding: 1rem;
    background: var(--primary);
    border-radius: 50%;
    box-shadow: $box-shadow-large;
  }

  &__headline {
    margin-bottom: rem(20px);
  }

  &__content {
    display: flex;
    justify-content: center;
    gap: rem(40px);
  }
}
</style>
