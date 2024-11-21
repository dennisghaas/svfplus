<template>
  <CardFrame :card-header-b-g="'bg-blue-dark-gray'" :hide-header-right="true">
    <template #cardHeaderLeft>
      <h4>
        {{
          currentUserProfile
            ? 'Deine Trainingsbeteiligung'
            : `${createGenetiveFromName(name)} Trainingsbeteiligung`
        }}
      </h4>
      <div class="body-text-b3 text-color-white-75">
        <p>[...] der letzten Trainingseinheiten</p>
      </div>
    </template>

    <template #cardBody>
      <div class="row">
        <div class="col-xs-12">
          <template v-if="responseLoading">
            <span>Daten werden geladen...</span>
          </template>
          <template v-else-if="noResponsesFound">
            <BadgeType
              :badge-text="'Keine Daten verfügbar'"
              :badge-type="'info'"
              :badge-alt="true"
              :badge-centered="true"
            />
          </template>
          <template v-else>
            <PracticeLight
              :list="participationList"
              :name="name"
              :surname="surname"
            />
          </template>
        </div>
      </div>
    </template>
  </CardFrame>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { createGenetiveFromName } from '@/helpers/createGenetiveFromName.ts';
import { usePracticeParticipation } from '@/composables/usePracticeParticipation.ts';
import CardFrame from '@/components/CardFrame.vue';
import BadgeType from '@/components/BadgeType.vue';
import PracticeLight from '@/components/PracticeLight.vue';

const {
  getPageUser,
  fetchEventResponse,
  noResponsesFound,
  participationList,
  responseLoading,
} = usePracticeParticipation();
const props = defineProps({
  currentUserName: {
    type: String,
    default: '',
  },
  currentUserProfile: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  surname: {
    type: String,
    default: '',
  },
  userId: {
    type: Number,
    default: 0,
  },
});

onMounted(async () => {
  getPageUser(props.userId);
  await fetchEventResponse();
});
</script>

<style scoped lang="scss"></style>
