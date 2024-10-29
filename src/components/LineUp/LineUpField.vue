<template>
  <div class="field__lineup">
    <div
        class="field__lineup__positions"
        v-for="(pos, index) in positions"
        :key="index"
        @dragover.prevent
        @drop="(event) => dropPlayer(event, pos.pos)"
    >
      <div>
        <span>
          {{ pos.pos }}: {{ pos.player }}
        </span>
        <button v-if="pos.player" type="button" @click="handleRemovingPlayer(pos.id)">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import {Positions} from "@/interface";
import ContentImage from "@/components/ContentImage.vue";

const props = defineProps<{
  positions: Positions[];
  dropPlayer: (event: DragEvent, position: string) => void;
}>();

const emit = defineEmits(['removePlayer']);

const handleRemovingPlayer = (playerId: number | null) => {
  emit('removePlayer', playerId);
};
</script>

<style scoped lang="scss">
.field__lineup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>