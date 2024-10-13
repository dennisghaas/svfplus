<template>
  <fieldset :class="{ 'vote-options': isVoteOptions }">
    <label class="typo-label" v-if="id && !hideLabel" :for="id">
      {{ label }}
    </label>

    <!-- Passwortfeld -->
    <div class="input-password" v-if="inputType === 'password'">
      <input
        :id="id"
        :type="passwordType"
        :placeholder="inputPlaceholder"
        :value="modelValue"
        class="input"
        :readonly="readonly"
        @input="onInput"
        @focus="emitFocus"
      />

      <template v-if="modelValue">
        <button
          class="show-password"
          type="button"
          @click="togglePasswordVisibility"
          :title="displayPassword ? 'Passwort verbergen' : 'Passwort anzeigen'"
        >
          <template v-if="displayPassword">
            <i class="icon-visible"></i>
            <span class="d-none">Passwort ist angezeigt</span>
          </template>
          <template v-else>
            <i class="icon-invisible"></i>
            <span class="d-none">Passwort ist verborgen</span>
          </template>
        </button>
      </template>
    </div>

    <!-- Normales Eingabefeld -->
    <template v-else>
      <template v-if="!readonly">
        <input
          :id="id"
          :type="inputType"
          :placeholder="inputPlaceholder"
          :value="formattedValue"
          class="input"
          @input="onInput"
          @focus="emitFocus"
        />
      </template>
      <template v-else>
        <input
          :id="id"
          :type="inputType"
          :placeholder="inputPlaceholder"
          :value="formattedValue"
          :readonly="readonly"
          class="input"
          @focus="emitFocus"
        />
      </template>
    </template>

    <!-- Fehlernachricht -->
    <span
      v-if="errorMessage"
      v-html="errorMessage"
      class="text-color-primary"
    />
    <span
      v-if="requiredMessage"
      v-html="requiredMessage"
      class="text-color-black-50 text-right"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props definieren
const props = defineProps<{
  inputType?: string
  inputPlaceholder?: string
  modelValue?: string | number | Date | null
  id?: string
  label?: string
  errorMessage?: string
  readonly?: boolean
  hideLabel?: boolean
  isVoteOptions?: boolean
  requiredMessage?: string
  minVal?: number
  maxNumbers?: boolean
  maxVal?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Date): void
  (e: 'focus', event: FocusEvent): void
}>()

// Lokaler Zustand für Passwortsichtbarkeit
const displayPassword = ref(false)

// Computed-Eigenschaft für Passworttyp
const passwordType = computed(() =>
  displayPassword.value ? 'text' : 'password',
)

// Funktion zur Überprüfung, ob ein Datum gültig ist
const isValidDate = (date: Date) => !isNaN(date.getTime())

// Wenn das Eingabefeld vom Typ "date" ist, wird das Datum formatiert
const formattedValue = computed(() => {
  if (
    props.inputType === 'date' &&
    props.modelValue instanceof Date &&
    isValidDate(props.modelValue)
  ) {
    return props.modelValue.toISOString().split('T')[0]
  }
  return props.modelValue
})

// Eingabe-Ereignis behandeln
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number | Date

  if (props.inputType === 'date') {
    const parsedDate = new Date(target.value)
    if (isValidDate(parsedDate)) {
      value = parsedDate
    } else {
      // Wenn das Datum ungültig ist, verwenden wir den eingegebenen Wert als String weiter
      value = target.value
    }
  } else {
    value = target.value
  }

  emit('update:modelValue', value)
}

// Passwortsichtbarkeit umschalten
const togglePasswordVisibility = () => {
  displayPassword.value = !displayPassword.value
}

// Fokus-Ereignis weiterleiten
const emitFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<style scoped lang="scss">
@import '@/styles/components/input';
</style>
