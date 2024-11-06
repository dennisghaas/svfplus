<template>
  <!-- Title input -->
  <div class="col-xs-12 col-lg-6">
    <InputType
      :id="'event-title'"
      :label="'Titel'"
      :input-type="'text'"
      :input-placeholder="'z.B. Training'"
      :model-value="title"
      @update:model-value="updateTitle"
      :error-message="titleError ? 'Dieses Feld darf nicht leer sein' : ''"
    />
  </div>

  <!-- Subtitle input -->
  <div class="col-xs-12 col-lg-6">
    <InputType
      :id="'event-subtitle'"
      :label="'Untertitel'"
      :input-type="'text'"
      :input-placeholder="'z.B. Training in roten Trikots'"
      :model-value="subtitle"
      @update:model-value="updateSubtitle"
      :error-message="subtitleError ? 'Dieses Feld darf nicht leer sein' : ''"
    />
  </div>

  <!-- Description textarea -->
  <div class="col-xs-12">
    <TextareaType
      :id="'event-description'"
      :label="'Beschreibung'"
      :placeholder="'z.B. Wir trainieren wirklich in roten Trikots'"
      :model-value="description"
      @update:model-value="updateDescription"
    />
  </div>

  <!-- Meet time input -->
  <div class="col-xs-12 col-lg-4">
    <InputType
      :id="'event-meet'"
      :label="'Treffen'"
      :input-type="'time'"
      :model-value="meetAt"
      :input-placeholder="'--:-- test'"
      @update:model-value="updateMeetAt"
      :error-message="meetAtError ? 'Dieses Feld darf nicht leer sein' : ''"
    />
  </div>

  <!-- Begin time input -->
  <div class="col-xs-12 col-lg-4">
    <InputType
      :id="'event-begin'"
      :label="'Beginn'"
      :input-type="'time'"
      :model-value="beginAt"
      @update:model-value="updateBeginAt"
      :error-message="beginAtError ? 'Dieses Feld darf nicht leer sein' : ''"
    />
  </div>

  <!-- End time input -->
  <div class="col-xs-12 col-lg-4">
    <InputType
      :id="'event-end'"
      :label="'Endet'"
      :input-type="'time'"
      :model-value="endAt"
      @update:model-value="updateEndAt"
    />
  </div>

  <template v-if="!isTraining">
    <!-- Deadline date input -->
    <div class="col-xs-12 col-lg-6">
      <InputType
        :id="'event-deadline-to-react-date'"
        :label="'Reaktionsstopp (Tag)'"
        :input-type="'date'"
        :model-value="deadlineToStartDay"
        @update:model-value="updateDeadlineToStartDay"
        :error-message="deadlineError ? 'Bitte ein Datum auswählen' : ''"
      />
    </div>

    <!-- Deadline time input -->
    <div class="col-xs-12 col-lg-6">
      <InputType
        :id="'event-deadline-to-react-time'"
        :label="'Reaktionsstopp (Uhrzeit)'"
        :input-type="'time'"
        :model-value="deadlineToStartTime"
        @update:model-value="updateDeadlineToStartTime"
        :error-message="deadlineError ? 'Bitte eine Uhrzeit auswählen' : ''"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
// Importing components
import InputType from '@/components/InputType.vue';
import TextareaType from '@/components/TextareaType.vue';

// Define props
defineProps({
  title: String,
  subtitle: String,
  description: String,
  meetAt: String,
  beginAt: String,
  endAt: String,
  deadlineToStartDay: String,
  deadlineToStartTime: String,
  titleError: Boolean,
  subtitleError: Boolean,
  meetAtError: Boolean,
  beginAtError: Boolean,
  deadlineError: Boolean,
  isTraining: Boolean,
});

// Define emits
const emit = defineEmits([
  'update:title',
  'update:subtitle',
  'update:description',
  'update:meetAt',
  'update:beginAt',
  'update:endAt',
  'update:deadlineToStartDay',
  'update:deadlineToStartTime',
]);

const updateTitle = (newTitle: string | number | Date) =>
  emit('update:title', newTitle.toString());
const updateSubtitle = (newSubtitle: string | number | Date) =>
  emit('update:subtitle', newSubtitle.toString());
const updateDescription = (newDescription: string | number | Date) =>
  emit('update:description', newDescription.toString());
const updateMeetAt = (newMeetAt: string | number | Date) =>
  emit('update:meetAt', newMeetAt.toString());
const updateBeginAt = (newBeginAt: string | number | Date) =>
  emit('update:beginAt', newBeginAt.toString());
const updateEndAt = (newEndAt: string | number | Date) =>
  emit('update:endAt', newEndAt.toString());
const updateDeadlineToStartDay = (newDeadlineDay: string | number | Date) =>
  emit('update:deadlineToStartDay', newDeadlineDay.toString());
const updateDeadlineToStartTime = (newDeadlineTime: string | number | Date) =>
  emit('update:deadlineToStartTime', newDeadlineTime.toString());
</script>
