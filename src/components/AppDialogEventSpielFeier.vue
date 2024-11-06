<template>
  <div
    v-if="selectedEvent[0] && selectedEvent[0].eventDescription"
    class="app-dialog--event__body"
  >
    <div v-if="eventType === 'Spiel'" class="row">
      <div class="col-xs-12">
        <InputType
          :id="'party-date'"
          :label="'Datum'"
          :input-type="'date'"
          v-model:modelValue="formattedDate"
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'venue-street'"
          :label="'Straße'"
          :input-type="'text'"
          :input-placeholder="'Straße der Veranstaltung'"
          v-model:modelValue="selectedEvent[0].venueStreet"
          :error-message="venueStreetError ? 'Adresse ist leider ungültig' : ''"
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'venue-postal-code'"
          :label="'PLZ'"
          :input-type="'text'"
          :input-placeholder="'Postleitzahl der Veranstaltung'"
          v-model:modelValue="selectedEvent[0].venuePostalCode"
          :error-message="
            venuePostalCodeError ? 'Postleitzahl ist leider ungültig' : ''
          "
        />
      </div>

      <div class="col-xs-12">
        <CheckboxType
          :label="'Im Dashboard der Spieler anzeigen'"
          :id="'checkbox-for-dashboard'"
          :value="selectedEvent[0].showInDashboard"
          :margin-bottom="!selectedEvent[0].showInDashboard"
          :no-border="selectedEvent[0].showInDashboard"
          @update:model-value="updateShowInDashboard"
        />

        <BadgeType
          v-if="selectedEvent[0].showInDashboard"
          :badge-type="'info'"
          :badge-text="'Das Event wird solange im Dashboard angezeigt, bis der Spieler darauf reagiert hat.'"
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'link-extern'"
          :label="'Link fussball.de (optional)'"
          :input-type="'text'"
          :input-placeholder="'Link'"
          v-model:modelValue="selectedEvent[0].linkExtern"
          :error-message="
            linkExternError
              ? 'Der Link ist nicht valide. Bitte nutze eine URL von Fussball.de.'
              : ''
          "
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <SelectTypeUser
          :select-title="'Spieler nicht nominieren'"
          :select-placeholder="'Spieler auswählen'"
          :selected-users="selectedEvent[0].playerWithNoAccess.map(String)"
          :select-i-d="'not-nominated-players-select-field'"
          :select-name="'not-nominated'"
          @update:selection="updatePlayerWithNoAccess"
        />
      </div>

      <AppDialogEventDesc
        :title="selectedEvent[0].eventDescription.title"
        :subtitle="selectedEvent[0].eventDescription.subtitle"
        :description="selectedEvent[0].eventDescription.description"
        :meetAt="selectedEvent[0].eventDescription.meetAt ?? ''"
        :beginAt="selectedEvent[0].eventDescription.beginAt ?? ''"
        :endAt="selectedEvent[0].eventDescription.endAt ?? ''"
        :deadlineToStartDay="deadlineToStartDay"
        :deadlineToStartTime="deadlineToStartTime"
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
        @update:deadlineToStartDay="updateDeadlineToStartDay"
        @update:deadlineToStartTime="updateDeadlineToStartTime"
      />

      <div class="col-xs-12">
        <ButtonType
          :type-button="true"
          :btn-class="''"
          :btn-text="'Änderungen speichern (Spiel)'"
          @click="validateForm(eventID, eventType, router)"
        />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-xs-12">
        <InputType
          :id="'party-date'"
          :label="'Datum'"
          :input-type="'date'"
          v-model:modelValue="formattedDate"
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'venue-street'"
          :label="'Straße'"
          :input-type="'text'"
          :input-placeholder="'Straße der Veranstaltung'"
          v-model:modelValue="selectedEvent[0].venueStreet"
          :error-message="venueStreetError ? 'Adresse ist leider ungültig' : ''"
        />
      </div>

      <div class="col-xs-12 col-lg-6">
        <InputType
          :id="'venue-postal-code'"
          :label="'PLZ'"
          :input-type="'text'"
          :input-placeholder="'Postleitzahl der Veranstaltung'"
          v-model:modelValue="selectedEvent[0].venuePostalCode"
          :error-message="
            venuePostalCodeError ? 'Postleitzahl ist leider ungültig' : ''
          "
        />
      </div>

      <div class="col-xs-12">
        <CheckboxType
          :label="'Im Dashboard der Spieler anzeigen'"
          :id="'checkbox-for-dashboard'"
          :value="selectedEvent[0].showInDashboard"
          :margin-bottom="!selectedEvent[0].showInDashboard"
          :no-border="selectedEvent[0].showInDashboard"
          @update:model-value="updateShowInDashboard"
        />

        <BadgeType
          v-if="selectedEvent[0].showInDashboard"
          :badge-type="'info'"
          :badge-text="'Das Event wird solange im Dashboard angezeigt, bis der Spieler darauf reagiert hat.'"
        />
      </div>

      <AppDialogEventDesc
        :title="selectedEvent[0].eventDescription.title"
        :subtitle="selectedEvent[0].eventDescription.subtitle"
        :description="selectedEvent[0].eventDescription.description"
        :meetAt="selectedEvent[0].eventDescription.meetAt ?? ''"
        :beginAt="selectedEvent[0].eventDescription.beginAt ?? ''"
        :endAt="selectedEvent[0].eventDescription.endAt ?? ''"
        :deadlineToStartDay="deadlineToStartDay"
        :deadlineToStartTime="deadlineToStartTime"
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
        @update:deadlineToStartDay="updateDeadlineToStartDay"
        @update:deadlineToStartTime="updateDeadlineToStartTime"
      />

      <div class="col-xs-12">
        <ButtonType
          :type-button="true"
          :btn-class="''"
          :btn-text="'Änderungen speichern'"
          @click="validateForm(eventID, eventType, router)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useEvents } from '@/composables/useEvents.ts';
import { validateStreet } from '@/helpers/validateStreet.ts';
import { validatePostalCode } from '@/helpers/validatePostalCode.ts';
import { extractDateAndTime } from '@/helpers/extractDateAndTime.ts';
import { useRouter, Router } from 'vue-router';
import { validateFussballDeLink } from '@/helpers/validateFussballDeLink.ts';
import ButtonType from '@/components/ButtonType.vue';
import InputType from '@/components/InputType.vue';
import CheckboxType from '@/components/CheckboxType.vue';
import BadgeType from '@/components/BadgeType.vue';
import SelectTypeUser from '@/components/SelectTypeUser.vue';
import AppDialogEventDesc from '@/components/AppDialogEventDesc.vue';

const router = useRouter();

const {
  editEventByID,
  fetchEventsByID,
  selectedEvent,
  standingOrderID,
  venue,
  venueStreet,
  venuePostalCode,
  eventDate,
  deadlineToStart,
  title,
  subtitle,
  description,
  meetAt,
  beginAt,
  endAt,
  linkExtern,
  playerWithNoAccess,
  showInDashboard,
} = useEvents();

// Define props
const props = defineProps({
  eventType: {
    type: String,
    default: '',
  },
  eventID: {
    type: Number,
    default: null,
  },
  date: {
    type: String,
    default: '',
  },
});

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

const updateDeadlineToStartDay = (newDeadlineDay: string) => {
  deadlineToStartDay.value = newDeadlineDay;
};

const updateDeadlineToStartTime = (newDeadlineTime: string) => {
  deadlineToStartTime.value = newDeadlineTime;
};

/* update booleans */
const updateShowInDashboard = (showDashboard: boolean) => {
  selectedEvent.value[0].showInDashboard = showDashboard;
};

const updatePlayerWithNoAccess = (noAccess: string[]) => {
  selectedEvent.value[0].playerWithNoAccess = noAccess.map((id) => Number(id));
};

/* get Date */
const eventDateNewValue = ref(new Date(props.date));
const formattedDate = ref(props.date);
watch(formattedDate, (newVal) => {
  eventDateNewValue.value = new Date(newVal);
});

/* deadline to start */
if (selectedEvent.value[0].eventDescription.deadlineToStart) {
  extractDateAndTime(selectedEvent.value[0].eventDescription.deadlineToStart);
}
const deadlineToStartDay = ref('');
const deadlineToStartTime = ref('');

watch([deadlineToStartDay, deadlineToStartTime], ([newDate, newTime]) => {
  const combineDateAndTime = (date: string, time: string): Date => {
    return new Date(`${date}T${time}`);
  };

  // Ensure newDate and newTime are not empty or invalid
  if (newDate && newTime) {
    const combinedDate = combineDateAndTime(newDate, newTime);
    deadlineToStart.value = combinedDate.toISOString();
    deadlineError.value = false;
  } else {
    deadlineError.value = true;
  }
});

/* save form*/
const saveForm = (eventID: number, eventType: string, router: Router) => {
  editEventByID(eventID, eventType, router);
};

/* validate from*/
const venueStreetError = ref(false);
const venuePostalCodeError = ref(false);
const titleError = ref(false);
const subtitleError = ref(false);
const meetAtError = ref(false);
const beginAtError = ref(false);
const deadlineError = ref(false);
const linkExternError = ref(false);

const validateForm = (eventID: number, eventType: string, router: Router) => {
  // Set unchanged data
  venue.value = selectedEvent.value[0].venue;
  standingOrderID.value = selectedEvent.value[0].standingOrderID;
  eventDate.value = eventDateNewValue.value;

  // Set changed data
  venueStreet.value = selectedEvent.value[0].venueStreet;
  venuePostalCode.value = selectedEvent.value[0].venuePostalCode;
  title.value = selectedEvent.value[0].eventDescription.title;
  subtitle.value = selectedEvent.value[0].eventDescription.subtitle;
  description.value = selectedEvent.value[0].eventDescription.description;
  meetAt.value = selectedEvent.value[0].eventDescription.meetAt as string;
  beginAt.value = selectedEvent.value[0].eventDescription.beginAt as string;
  endAt.value = selectedEvent.value[0].eventDescription.endAt as string;
  linkExtern.value = selectedEvent.value[0].linkExtern;
  showInDashboard.value = selectedEvent.value[0].showInDashboard;
  playerWithNoAccess.value = selectedEvent.value[0].playerWithNoAccess
    ? selectedEvent.value[0].playerWithNoAccess.map(String)
    : [];

  /* validation for new input */
  venueStreetError.value =
    !validateStreet(venueStreet.value) || venueStreet.value.length <= 0;
  venuePostalCodeError.value =
    !validatePostalCode(venuePostalCode.value) ||
    venuePostalCode.value.length <= 0;
  titleError.value = title.value.length <= 0;
  subtitleError.value = subtitle.value.length <= 0;
  meetAtError.value = meetAt.value.length <= 0;
  beginAtError.value = beginAt.value.length <= 0;

  if (linkExtern.value) {
    linkExternError.value = !validateFussballDeLink(linkExtern.value);
  } else {
    linkExternError.value = false;
  }

  if (eventType === 'Spiel') {
    if (
      !venueStreetError.value &&
      !venuePostalCodeError.value &&
      !titleError.value &&
      !subtitleError.value &&
      !meetAtError.value &&
      !beginAtError.value &&
      !linkExternError.value
    ) {
      saveForm(eventID, eventType, router);
    }
  } else {
    if (
      !venueStreetError.value &&
      !venuePostalCodeError.value &&
      !titleError.value &&
      !subtitleError.value &&
      !meetAtError.value &&
      !beginAtError.value
    ) {
      saveForm(eventID, eventType, router);
    }
  }
};

// Fetch events on mounted
onMounted(() => {
  fetchEventsByID(props.eventID);

  if (selectedEvent.value && selectedEvent.value.length > 0) {
    const deadlineToStart =
      selectedEvent.value[0].eventDescription.deadlineToStart;

    // Check if deadlineToStart is not null before extracting
    if (deadlineToStart) {
      const { day, formattedTime } = extractDateAndTime(deadlineToStart);
      deadlineToStartDay.value = day || ''; // Fallback to an empty string if day is null
      deadlineToStartTime.value = formattedTime || ''; // Fallback to an empty string if formattedTime is null
    } else {
      // If deadlineToStart is null, set defaults or handle as necessary
      deadlineToStartDay.value = '';
      deadlineToStartTime.value = '';
    }
  }
});
</script>

<style scoped lang="scss"></style>
