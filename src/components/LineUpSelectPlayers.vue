<template>
  <fieldset>
    <label class="typo-label" :for="selectId">
      {{ selectTitle }}
    </label>

    <div class="select-wrapper">
      <select
        class="select"
        :name="selectName"
        :id="selectId"
        @change="emitSelection"
      >
        <option :value="selectPlaceholder">
          {{ selectPlaceholder }}
        </option>
        <template v-for="option in selectedUserList" :key="option">
          <template v-if="!linedUpPlayers.includes(option.id)">
            <option :value="option.id">
              {{ option.name }} {{ option.surname }}

              <template
                v-if="selectedUserListEventResponse(option.id) === 'Zusagen'"
              >
                (Zugesagt)
              </template>
              <template v-else> (Unsicher) </template>
            </option>
          </template>
        </template>
      </select>

      <i class="icon-chevron-down"></i>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLineUp } from '@/composables/useLineUp.ts';

const { selectedUserList, selectedUserListEventResponse, linedUpPlayers } =
  useLineUp();

defineProps({
  selectId: {
    type: String,
    default: '',
  },
  selectTitle: {
    type: String,
    default: '',
  },
  selectName: {
    type: String,
    default: '',
  },
  selectPlaceholder: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:selection']);
const targetValue = ref('');

const emitSelection = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:selection', target.value);
  targetValue.value = target.value;
};
</script>

<style scoped lang="scss">
@import '@/styles/components/select';
</style>
