<template>
  <div class="create-form-card--inner">
    <CardEvent
      :event-type="eventType"
      :title="title"
      :subtitle="subtitle"
      :venue="venue"
      :venue-street="venueStreet"
      :venue-postal-code="venuePostalCode"
      :meet-at="meetAt"
      :begin-at="beginAt"
      :end-at="endAt"
      :description="description"
      :link-extern="linkExtern"
      :event-date="eventDate.toISOString()"
      :vote-multiple-selection="voteMultipleSelection"
      :vote-question="voteQuestion"
      :vote-options="voteOptions"
      :preview="true"
    />

    <ButtonWrapper>
      <template #buttons>
        <ButtonType
          :type-button="true"
          :btn-class="'w-100'"
          :btn-text="'Event erstellen'"
          @click="handleCreateEvent()"
        />

        <CreateFormNextButton
          :nextID="'meta'"
          :btnText="'Änderungen verwerfen'"
          :btn-class="'btn-secondary w-100'"
          @click="discardEventChanges()"
        />

        <BadgeType
          :badge-type="'info'"
          :badge-text="'Tipp: Über die obere Navigation (Schritt&nbsp;1-3) kannst du bei den Formularen noch Anpassungen vornehmen.'"
          :badge-centered="true"
          :badge-alt="true"
        />
      </template>
    </ButtonWrapper>
  </div>
</template>

<script setup lang="ts">
import { useEvents } from '@/composables/useEvents.ts'
import ButtonType from '@/components/ButtonType.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'
import CreateFormNextButton from '@/components/CreateFormNextButton.vue'
import BadgeType from '@/components/BadgeType.vue'
import CardEvent from '@/components/CardEvent.vue'

const {
  eventType,
  title,
  subtitle,
  venue,
  venueStreet,
  venuePostalCode,
  meetAt,
  beginAt,
  endAt,
  linkExtern,
  description,
  eventDate,
  voteMultipleSelection,
  voteQuestion,
  voteOptions,
  createEvent,
  discardEventChanges,
} = useEvents()

const handleCreateEvent = () => {
  /* possible place to validate the last time the users input */
  createEvent()
}
</script>

<style scoped lang="scss">
@import '@/styles/components/create-form';
</style>
