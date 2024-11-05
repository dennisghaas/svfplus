<template>
  <div class="lineup__card">
    <h3>
      {{ headline }}
    </h3>
    <div v-if="content" class="body-text-b2">
      <p>
        {{content}}
      </p>
    </div>

    <div v-if="showEvents && !showSlot" v-for="item in events" class="lineup__card__game-quick-link">
      <h4>
        {{item.venue}}
      </h4>

      <div class="body-text-b3 text-color-white-75">
        <p>
          {{item.eventDescription.subtitle}}
        </p>
      </div>

      <button class="lineup__card__game-quick-link-button" type="button" @click="handleUseEventForLineUp(item.id)">
        <i class="icon-chevron-right"></i>
        <span class="d-none">
          Öffne Aufstellung für dieses Spiel
        </span>
      </button>
    </div>

    <template v-if="!showEvents && !showSlot">
      <SelectType />

      <ButtonType
          :btn-class="'w-100'"
          :btn-text="'Aufstellung anzeigen'"
          :type-button="true"
      />
    </template>

    <template v-if="!showEvents && showSlot">
      <slot name="slotContent"></slot>
    </template>

  </div>
</template>

<script setup lang="ts">
import {Event} from "@/interface";
import SelectType from "@/components/SelectType.vue";
import ButtonType from "@/components/ButtonType.vue";

defineProps({
  headline: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  events: {
    type: Array as () => Event[],
    default: () => []
  },
  showEvents: {
    type: Boolean,
    default: false
  },
  showSlot: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['useEventForLineUp'])

const handleUseEventForLineUp = (id: number) => {
  emit('useEventForLineUp', id)
}

</script>

<style lang="scss" scoped>
.lineup__card {
  background: var(--white);
  padding: rem(20px);
  border-radius: rem(10px);
  margin-bottom: rem(20px);

  h3, .h3 {
    margin-bottom: rem(20px);
  }

  [class*="body-text-"] {
    margin-bottom: 1rem;
  }

  &__game-quick-link {
    position: relative;
    padding: rem(10px) rem(20px);
    color: var(--white);
    background: var(--blue-soft-gray);
    border-radius: rem(10px);
    margin-top: 1rem;

    [class*="body-text-"] {
      margin-bottom: 0;
    }

    &-button {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: rem(20px);
    }
  }
}
</style>