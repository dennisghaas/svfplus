<template>
  <div
    v-if="selectedEvent[0] && selectedEvent[0].eventDescription"
    class="app-dialog--event__body"
  >
    <div class="row">
      <div class="col-xs-12">
        <BadgeType
          v-if="!standingOrderCheckbox"
          :badge-type="'warning'"
          :badge-text="'Du bearbeitest aktuell nur ein Training und nicht den kompletten Dauerauftrag'"
        />
        <CheckboxType
          :label="'Kompletten Dauerauftrag bearbeiten'"
          :id="'checkbox-for-standing-order'"
          :value="standingOrderCheckbox"
          :margin-bottom="true"
          @update:model-value="updateStandingOrderCheckbox"
        />
      </div>

      <div v-if="!standingOrderCheckbox" class="col-xs-12">
        <InputType
          :id="'party-date'"
          :label="'Datum'"
          :input-type="'date'"
          v-model:modelValue="formattedDate"
        />
      </div>

      <AppDialogEventDesc
        :is-training="true"
        :title="selectedEvent[0].eventDescription.title"
        :subtitle="selectedEvent[0].eventDescription.subtitle"
        :description="selectedEvent[0].eventDescription.description"
        :meetAt="selectedEvent[0].eventDescription.meetAt || ''"
        :beginAt="selectedEvent[0].eventDescription.beginAt || ''"
        :endAt="selectedEvent[0].eventDescription.endAt || ''"
        :title-error="titleError"
        :subtitle-error="subtitleError"
        :meetAt-error="meetAtError"
        :beginAt-error="beginAtError"
        :deadline-error="deadlineError"
        @update:title="updateTitle"
        @update:subtitle="updateSubtitle"
        @update:description="updateDescription"
        @update:meetAt="updateMeetAt"
        @update:beginAt="updateBeginAt"
        @update:endAt="updateEndAt"
      />
    </div>

    <div class="col-xs-12">
      <ButtonType
        :type-button="true"
        :btn-class="''"
        :btn-text="'Änderungen speichern'"
        @click="getCurrentStandingOrderIDs(eventID, eventType, router)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useEvents } from '@/composables/useEvents.ts';
import { useRouter, Router } from 'vue-router';
import CheckboxType from '@/components/CheckboxType.vue';
import InputType from '@/components/InputType.vue';
import AppDialogEventDesc from '@/components/AppDialogEventDesc.vue';
import ButtonType from '@/components/ButtonType.vue';
import BadgeType from '@/components/BadgeType.vue';

const router = useRouter();
const props = defineProps({
  eventID: {
    type: Number,
    default: null,
  },
  eventType: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
});

const {
  fetchEventsByID,
  fetchStandingOrderResponse,
  editEventByID,
  selectedEvent,
  standingOrderArray,
  standingOrderID,
  venue,
  eventDate,
  title,
  subtitle,
  description,
  meetAt,
  beginAt,
  endAt,
} = useEvents();

/* check user editing type */
const standingOrderCheckbox = ref(false);
const updateStandingOrderCheckbox = (isStandingOrder: boolean) => {
  standingOrderCheckbox.value = isStandingOrder;

  if (standingOrderCheckbox.value) {
    eventDateNewValue.value = new Date(props.date);
  } else {
    // Sicherstellen, dass formattedDate ein gültiges Datum ist
    const parsedDate = new Date(formattedDate.value);
    if (!isNaN(parsedDate.getTime())) {
      eventDateNewValue.value = parsedDate;
    } else {
      console.error(
        'formattedDate.value is not a valid date string:',
        formattedDate.value
      );
      eventDateNewValue.value = new Date(); // Setze auf das aktuelle Datum als Fallback
    }
  }
};

/* update description inputs */
const updateTitle = (newTitle: string) => {
  selectedEvent.value[0].eventDescription.title = newTitle;
};

const updateSubtitle = (newSubtitle: string) => {
  selectedEvent.value[0].eventDescription.subtitle = newSubtitle;
};

const updateDescription = (newDescription: string) => {
  selectedEvent.value[0].eventDescription.description = newDescription;
};

const updateMeetAt = (newMeetAt: string) => {
  selectedEvent.value[0].eventDescription.meetAt = newMeetAt;
};

const updateBeginAt = (newBeginAt: string) => {
  selectedEvent.value[0].eventDescription.beginAt = newBeginAt;
};

const updateEndAt = (newEndAt: string) => {
  selectedEvent.value[0].eventDescription.endAt = newEndAt;
};

const getCurrentStandingOrderIDs = (
  eventID: number,
  eventType: string,
  router: Router
) => {
  const currentStandingOrder = selectedEvent.value[0].standingOrderID;
  const currentStandingOrderIndex =
    standingOrderArray.value[currentStandingOrder - 1];
  const currentStandingOrderEvents = currentStandingOrderIndex.eventIDs;

  validateForm(eventID, eventType, router, currentStandingOrderEvents);
};

/* get Date */
const eventDateNewValue = ref(new Date(props.date));
const formattedDate = ref(props.date);
watch(formattedDate, (newVal) => {
  eventDateNewValue.value = new Date(newVal);
});

/* validate form errors */
const titleError = ref(false);
const subtitleError = ref(false);
const meetAtError = ref(false);
const beginAtError = ref(false);
const deadlineError = ref(false);

const validateForm = async (
  eventID: number,
  eventType: string,
  router: Router,
  currentStandingOrderEvents: any
) => {
  venue.value = selectedEvent.value[0]?.venue;
  standingOrderID.value = selectedEvent.value[0]?.standingOrderID;

  title.value = selectedEvent.value[0].eventDescription.title;
  subtitle.value = selectedEvent.value[0].eventDescription.subtitle;
  description.value = selectedEvent.value[0].eventDescription.description;
  meetAt.value = selectedEvent.value[0].eventDescription.meetAt || '';
  beginAt.value = selectedEvent.value[0].eventDescription.beginAt || '';
  endAt.value = selectedEvent.value[0].eventDescription.endAt || '';

  let standingOrderDates: string[] = [];

  if (standingOrderCheckbox.value) {
    await fetchEventsByID(eventID, currentStandingOrderEvents);
    standingOrderDates = selectedEvent.value.map(
      (event) => event.eventDate || ''
    );
  } else {
    eventDate.value = eventDateNewValue.value;
  }

  saveForm(
    eventID,
    eventType,
    router,
    currentStandingOrderEvents,
    standingOrderDates
  );
};

const saveForm = (
  eventID: number,
  eventType: string,
  router: Router,
  currentStandingOrderEvents: any,
  standingOrderDates: any
) => {
  if (!standingOrderCheckbox.value) {
    editEventByID(eventID, eventType, router);
  } else {
    editEventByID(
      eventID,
      eventType,
      router,
      true,
      currentStandingOrderEvents,
      standingOrderDates
    );
  }
};

onMounted(() => {
  fetchStandingOrderResponse();
  fetchEventsByID(props.eventID);
});
</script>

<style scoped lang="scss"></style>
