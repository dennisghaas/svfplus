<template>
  <div class="table__wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in storage" :key="item.id">
          <td class="text-color-black-75">{{ item.id }}</td>
          <td class="text-color-black-75">{{ item.name }}</td>
          <td class="table__button">
            <ButtonType
              :btn-class="'btn-light btn-light--success'"
              :btn-text="'Aufstellung laden'"
              :type-button="true"
              @click="handleLoadFormation(item.id)"
            />
          </td>
          <td class="table__button">
            <ButtonType
              :btn-class="'btn-light btn-light--error'"
              :btn-text="'Aufstellung löschen'"
              :type-button="true"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { LoadedLineUpSelectionNames } from '@/interface';
import ButtonType from '@/components/ButtonType.vue';

const emits = defineEmits(['loadFormation']);

const handleLoadFormation = (id: number) => {
  emits('loadFormation', id);
};

defineProps({
  storage: {
    type: Array as () => LoadedLineUpSelectionNames[],
    default: () => [] as LoadedLineUpSelectionNames[],
  },
});
</script>

<style scoped lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;

  &__wrapper {
    overflow-x: scroll;
  }

  thead {
    background: var(--blue-light);

    th {
      text-align: left;
      padding: rem(20px);
    }
  }

  tbody {
    tr {
      &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
      }

      td {
        padding: rem(10px);

        @include media-breakpoint-up(lg) {
          padding: rem(20px);
        }

        &.table__button {
          > * {
            margin-left: auto;
          }
        }
      }

      &:nth-child(even) {
        background: var(--gray-very-soft);
      }
    }
  }
}
</style>
