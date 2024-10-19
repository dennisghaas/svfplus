<template>
  <div
      class="app-dialog--reaction"
      :style="{ '--dialog-color': resolveDialogColor }"
  >
    <div class="app-dialog--reaction-headline">
      <i :class="`icon-calendar-${resolveDialogIcon}`"></i>
      <h2>{{ resolveDialogHeadline }}</h2>
    </div>

    <div class="app-dialog--reaction-body">
      <InputType
          :id="'reason'"
          :label="
          reaction === 'Zusagen'
            ? 'Möchtest du uns noch was mitteilen?'
            : 'Wieso?*'
        "
          :input-type="'text'"
          :input-placeholder="
          reaction === 'Zusagen'
            ? 'Ich muss doch nicht länger arbeiten und bin dabei'
            : 'Ich muss länger arbeiten'
        "
          v-model:model-value="message"
          :required-message="requiredMessage"
          :error-message="messageError ? errorMessageString : ''"
      />

      <ButtonType
          :btn-text="resolveButtonText"
          :btn-class="[resolveButtonClass, 'w-100']"
          :type-button="true"
          @click="validateResponse()"
      />
    </div>

    <BadgeType
        v-if="reaction === 'Absagen' || reaction === 'Unsicher'"
        :badge-type="'info'"
        :badge-text="'Wir freuen uns, deine Laufeinheit in der Gruppe sehen zu können :)'"
        :badge-centered="true"
        :additional-class="'event'"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {validateSentence} from '@/helpers/validateSentence.ts'
import {useEventResponse} from '@/composables/useEventResponse.ts'
import {useRouter} from 'vue-router'
import store from "@/store";
import {EventResponse} from "@/interface"
import InputType from '@/components/InputType.vue'
import ButtonType from '@/components/ButtonType.vue'
import BadgeType from "@/components/BadgeType.vue";

const router = useRouter()
const resolveDialogHeadline = ref('')
const resolveDialogIcon = ref('')
const resolveDialogColor = ref('')
const resolveButtonClass = ref('')
const resolveButtonText = ref('')
const requiredMessage = ref('')

const {fetchEventResponse, selectEventResponses} = useEventResponse()

const messageError = ref(false)
const errorMessageString = ref('')

const props = defineProps({
  eventID: {
    type: Number,
    default: null,
  },
  reaction: {
    type: String,
    default: '',
  },
})

const message = ref('')
const checkIfUserAlreadyResponded = async () => {
  if (filterEventResponse.value) {
    if (props.reaction === filterEventResponse.value.response) {
      message.value = filterEventResponse.value?.reason
    }
  }
}

const filterEventResponse = computed<EventResponse | null>(() => {
  if (selectEventResponses.value) {
    return (
        selectEventResponses.value.find(
            (response) => response.userId === store.state.userData.id
        ) || null
    );
  }
  return null;
});

const resolveUserReaction = () => {
  if (props.reaction === 'Zusagen') {
    resolveDialogHeadline.value = 'Termin zusagen'
    resolveDialogIcon.value = 'accept'
    resolveDialogColor.value = 'var(--success-light)'
    resolveButtonClass.value = 'btn-success'
    resolveButtonText.value = 'Zusagen'
    requiredMessage.value = ''
  } else if (props.reaction === 'Absagen') {
    resolveDialogHeadline.value = 'Absagen'
    resolveDialogIcon.value = 'decline'
    resolveDialogColor.value = 'var(--primary)'
    resolveButtonClass.value = 'btn-primary'
    resolveButtonText.value = 'Termin absagen'
    requiredMessage.value =
        '*Nur Trainer und du selbst können den Grund deiner Absage einsehen'
  } else {
    resolveDialogHeadline.value = 'Teilnahme unsicher'
    resolveDialogIcon.value = 'not-sure'
    resolveDialogColor.value = 'var(--gray-dark)'
    resolveButtonClass.value = 'btn-tertiary'
    resolveButtonText.value = 'Unsicher'
    requiredMessage.value =
        '*Nur Trainer und du selbst können den Grund deiner unsicheren Zu- oder Absage einsehen'
  }
}

const validateResponse = () => {
  if (props.reaction !== 'Zusagen') {
    if (message.value.length <= 0) {
      messageError.value = true
      errorMessageString.value = 'Dieses Feld ist ein Pflichtfeld!'
    } else if (!validateSentence(message.value)) {
      messageError.value = true
      errorMessageString.value =
          '' +
          'Wir brauchen mehr als das! (Min. drei Wörter). <br>Ausnahmen sind: <q>Spätschicht</q>, <q>Nachtschicht</q>, <q>Frühschicht</q>, <q>Verletzt</q>, <q>bin krank</q>, <q>krank</q>, <q>Urlaub</q>, <q>brauch Pause</q>, <q>Pause</q>.'
    } else {
      messageError.value = false
      sendResponse()
    }
  } else {
    /* Bei Zusagen muss die Form nicht validiert werden */
    sendResponse()
  }
}

const sendResponse = async () => {
  const {eventResponse} = useEventResponse()
  await eventResponse(props.reaction, props.eventID, message.value, router)
}

onMounted(() => {
  resolveUserReaction()
})

onMounted(async () => {
  await fetchEventResponse(props.eventID)
  await checkIfUserAlreadyResponded();
})
</script>

<style scoped lang="scss">
.app-dialog--reaction {
  --dialog-color: var(--black);

  &-headline {
    display: flex;
    align-items: center;
    margin-bottom: rem(60px);

    [class*='icon-'] {
      font-size: 2rem;
      margin-right: rem(15px);
      color: var(--dialog-color);
    }
  }
}
</style>
