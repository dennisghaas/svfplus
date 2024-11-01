<template>
  <SectionType :class="'mt-0'">
    <template #sectionContent>
<!--      <LinkType
          v-if="activeStep > 0"
          :btn-class="'btn-prev w-100'"
          :btn-text="'Zurück zur Team Übersicht'"
          :btn-icon-prev="true"
          :btn-icon="'icon-chevron-left'"
          @click="handleChangeStepToPrev()"
      />-->

      <LineUpSteps
          :steps="steps"
          :active-step="activeStep"
          @change-step="handleChangeStep"
      />

      <LineUp
          :active-step="activeStep"
          @count-up-step="handleCountUpStep"
          @changeStepToPrev="handleChangeStepToPrev"
      />
    </template>
  </SectionType>
</template>

<script lang="ts" setup>
import {onMounted, ref, reactive} from "vue";
import store from "@/store";
import LineUp from "@/components/LineUp.vue";
import SectionType from "@/components/SectionType.vue";
import LineUpSteps from "@/components/LineUpSteps.vue";
import LinkType from "@/components/LinkType.vue";

/* by default first index is selected */
const activeStep = ref(0)

const steps = reactive([
  {
    name: 'Schritt 1',
    active: true
  },
  {
    name: 'Schritt 2',
    active: false
  },
  {
    name: 'Schritt 3',
    active: false
  }
])

/* navigation */
const handleChangeStep = (index: number) => {
  steps.forEach((step, i) => {
    step.active = i === index;
  });

  /* pass current selected index to children component */
  activeStep.value = index
}

const changeActiveStep = () => {
  steps.forEach((step, i) => {
    step.active = i === activeStep.value
  });
}

const handleCountUpStep = () => {
  if(activeStep.value < 2) {
    activeStep.value = ++activeStep.value
    changeActiveStep()
  }
}

const handleChangeStepToPrev = () => {
  console.clear();
  activeStep.value = --activeStep.value
  changeActiveStep()
}

onMounted(() => {
  store.pageHeadline('Aufstellung')
})
</script>

<style lang="scss" scoped>
</style>