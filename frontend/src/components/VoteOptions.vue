<template>
  <legend class="typo-label">Optionen</legend>

  <template v-for="(item, index) in answers" :key="index">
    <InputType
      :id="`option_0${item.index + 1}`"
      :input-type="'text'"
      :input-placeholder="'Option'"
      :hide-label="true"
      :is-vote-options="true"
      v-model:modelValue="item.text"
      @focus="handleFocus(index)"
    />
  </template>

  <button v-if="showButton" type="button" @click="addNewQuestion">
    Neue Frage hinzufügen
  </button>

  <span v-if="errorMessage" class="text-color-primary">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InputType from '@/components/InputType.vue'
import { answer } from '@/interface'

const props = defineProps({
  answers: {
    type: Array as () => answer[],
    default: () => [
      { text: '', index: 0 },
      { text: '', index: 1 },
    ],
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:answers'])
const lastIndex = ref(0)
const showButton = ref(false)

const addNewQuestion = () => {
  const newString = { text: '', index: (lastIndex.value += 1) }
  emit('update:answers', [...props.answers, newString])
}

const handleFocus = (index: number) => {
  showButton.value = index === props.answers.length - 1

  console.log('array', props.answers.length)
  console.log('last index', lastIndex.value)
  console.log('current index', index)

  /*if (props.answers.length > 2) {
    // Überprüfen, ob das zu entfernende Element leer ist und ob die ersten beiden Elemente leer sind
    if (props.answers[index].text.length <= 0 &&
        props.answers[0].text.length <= 0 &&
        props.answers[1].text.length <= 0) {
      if (index >= 2) {
        const indexToRemove = index;
        if (indexToRemove > -1 && indexToRemove < props.answers.length) {
          // Erstelle eine neue Kopie des Arrays ohne das Element an indexToRemove
          const updatedAnswers = [...props.answers];
          updatedAnswers.splice(indexToRemove, 1);
          emit('update:answers', updatedAnswers);
        }
      }
    } else {
      console.log('Entferne dieses Element nicht');
    }
  }*/
}

onMounted(() => {
  lastIndex.value = props.answers.length - 1
})
</script>

<style scoped lang="scss">
@import '@/styles/components/input';
</style>
