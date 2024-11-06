<template>
  <CardFrame :card-header-b-g="'bg-blue-dark-gray'" :hide-header-right="true">
    <template #cardHeaderLeft>
      <h4>
        {{
          currentUserProfile
            ? 'Deine Trainingsbeteiligung'
            : `${createGenetiveFromName(userName)} Trainingsbeteiligung`
        }}
      </h4>
      <div class="body-text-b3 text-color-white-75">
        <p>[...] der letzten Trainingseinheiten</p>
      </div>
    </template>

    <template #cardBody>
      <div class="row">
        <div class="col-xs-12">
          <BadgeType
            :badge-type="'info'"
            :badge-text="'Diese Ansicht folgt'"
            :badge-centered="true"
          />
        </div>
      </div>
    </template>
  </CardFrame>
</template>

<script setup lang="ts">
import CardFrame from '@/components/CardFrame.vue';
import { createGenetiveFromName } from '@/helpers/createGenetiveFromName.ts';
import BadgeType from '@/components/BadgeType.vue';

defineProps({
  currentUserName: {
    type: String,
    default: '',
  },
  currentUserProfile: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss"></style>
