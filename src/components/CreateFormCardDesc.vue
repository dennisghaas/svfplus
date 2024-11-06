<template>
  <div class="create-form-card--inner">
    <InputType
      v-if="eventType !== 'Abstimmung'"
      :id="'event-title'"
      :label="'Titel'"
      :input-type="'text'"
      :input-placeholder="'z.B. Training'"
      v-model:model-value="title"
      :error-message="titleError ? 'Dieses Feld darf nicht leer sein' : ''"
    />

    <InputType
      v-if="eventType !== 'Abstimmung'"
      :id="'event-subtitle'"
      :label="'Untertitel'"
      :input-type="'text'"
      :input-placeholder="'z.B. Training in roten Trikots'"
      v-model:modelValue="subtitle"
      :error-message="subtitleError ? 'Dieses Feld darf nicht leer sein' : ''"
    />

    <TextareaType
      v-if="eventType !== 'Abstimmung'"
      :id="'event-description'"
      :label="'Beschreibung'"
      :placeholder="'z.B. Wir trainieren wirklich in roten Trikots'"
      v-model:model-value="description"
    />

    <InputType
      v-if="eventType !== 'Abstimmung'"
      :id="'event-meet'"
      :label="'Treffen'"
      :input-type="'time'"
      v-model:modelValue="meetAt"
      :error-message="meetAtError ? 'Dieses Feld darf nicht leer sein' : ''"
    />

    <InputType
      v-if="eventType !== 'Abstimmung'"
      :id="'event-begin'"
      :label="'Beginn'"
      :input-type="'time'"
      v-model:modelValue="beginAt"
      :error-message="beginAtError ? 'Dieses Feld darf nicht leer sein' : ''"
    />

    <InputType
      v-if="eventType !== 'Abstimmung'"
      :id="'event-end'"
      :label="'Endet'"
      :input-type="'time'"
      v-model:modelValue="endAt"
    />

    <template v-if="eventType !== 'Training'">
      <InputType
        :id="'event-deadline-to-react-date'"
        :label="'Reaktionsstopp (Tag)'"
        :input-type="'date'"
        v-model:modelValue="deadlineToReactDate"
        :error-message="deadlineError ? 'Bitte ein Datum auswählen' : ''"
      />

      <InputType
        :id="'event-deadline-to-react-time'"
        :label="'Reaktionsstopp (Uhrzeit)'"
        :input-type="'time'"
        v-model:modelValue="deadlineToReactTime"
        :error-message="deadlineError ? 'Bitte eine Uhrzeit auswählen' : ''"
      />

      <BadgeType
        :badge-alt="true"
        :badge-centered="true"
        :badge-type="'info'"
        :badge-text="'Um die genaue Deadline zu definieren, kannst du sowohl den Tag, als auch die Uhrzeit definieren.'"
      />
    </template>

    <template v-else>
      <BadgeType
        :badge-alt="true"
        :badge-centered="true"
        :badge-type="'info'"
        :badge-text="'Es wird automatisch eine Reaktionsfrist erstellt. Diese endet eine Stunde vor Trainingstreffpunkt.'"
      />
    </template>

    <CreateFormNextButton
      :nextID="'result'"
      :btnText="'Weiter zu Vorschau'"
      :btn-class="'w-100'"
      @click="validateForm()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useHandleNextCreateForm } from '@/composables/useHandleNextCreateForm.ts';
import { useEvents } from '@/composables/useEvents.ts';
import { combineDateAndTime } from '@/helpers/combineDateAndTime.ts';
import CreateFormNextButton from '@/components/CreateFormNextButton.vue';
import InputType from '@/components/InputType.vue';
import TextareaType from '@/components/TextareaType.vue';
import BadgeType from '@/components/BadgeType.vue';

/* ERROR REFS */
const titleError = ref(false);
const subtitleError = ref(false);
const meetAtError = ref(false);
const beginAtError = ref(false);
const deadlineError = ref(false);

/* HANDLE FORM VALIDATION */
const { handleNextForm } = useHandleNextCreateForm();

const validateForm = () => {
  titleError.value = title.value.length <= 0;
  subtitleError.value = subtitle.value.length <= 0;
  meetAtError.value = meetAt.value.length <= 0;
  beginAtError.value = beginAt.value.length <= 0;

  /* extra check for deadline to start error message */
  if (eventType.value !== 'Training') {
    if (deadlineToStart.value === undefined || !deadlineToStart.value) {
      deadlineError.value = true;
    }
  }

  if (eventType.value === 'Abstimmung') {
    if (!deadlineError.value && deadlineToStart.value) {
      eventDate.value = new Date(deadlineToStart.value);
      handleNextForm('result');
    }
  } else {
    if (
      !titleError.value &&
      !subtitleError.value &&
      !meetAtError.value &&
      !beginAtError.value &&
      !deadlineError.value
    ) {
      handleNextForm('result');
    }
  }
};

const deadlineToReactDate = ref(new Date());
const deadlineToReactTime = ref('');

watch([deadlineToReactDate, deadlineToReactTime], ([newDate, newTime]) => {
  deadlineToStart.value = combineDateAndTime(newDate, newTime);

  if (deadlineToStart.value) {
    deadlineError.value = false;
  }
});

const {
  eventType,
  eventDate,
  title,
  subtitle,
  description,
  meetAt,
  beginAt,
  endAt,
  deadlineToStart,
} = useEvents();
</script>

<style scoped lang="scss">
@import '@/styles/components/create-form';
</style>
