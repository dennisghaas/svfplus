<template>
  <SectionType :class="'mt-0'">
    <template #sectionContent>
      <LineUpSteps
          v-if="!hideStepNavigation"
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

const hideStepNavigation = ref(false)

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

const hideNavigationOnStepTwo = () => {
  hideStepNavigation.value = activeStep.value === 1;
}

const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}

/* navigation */
const handleChangeStep = (index: number) => {
  steps.forEach((step, i) => {
    step.active = i === index;
  });

  /* pass current selected index to children component */
  activeStep.value = index

  /* hide step navigation on: line up view */
  hideNavigationOnStepTwo()

  /* scroll to top on view leave */
  scrollToTop()
}

const changeActiveStep = () => {
  steps.forEach((step, i) => {
    step.active = i === activeStep.value
  });

  /* hide step navigation on: line up view */
  hideNavigationOnStepTwo()

  /* scroll to top on view leave */
  scrollToTop()
}

const handleCountUpStep = () => {
  if(activeStep.value < 2) {
    activeStep.value = ++activeStep.value
    changeActiveStep()
  }

  /* hide step navigation on: line up view */
  hideNavigationOnStepTwo()

  /* scroll to top on view leave */
  scrollToTop()
}

const handleChangeStepToPrev = () => {
  console.clear();
  activeStep.value = --activeStep.value
  changeActiveStep()

  /* scroll to top on view leave */
  scrollToTop()
}

onMounted(() => {
  store.pageHeadline('Aufstellung')
})
</script>

<style lang="scss" scoped>
</style>