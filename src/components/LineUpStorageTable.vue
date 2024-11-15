<template>
  <div class="table__wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Ersteller</th>
          <th>Name</th>
          <th>Zuletzt bearbeitet</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in storage.slice().reverse()" :key="item.id">
          <td class="text-color-black-75">{{ item.id }}</td>
          <td class="text-color-black-75">{{ item.author }}</td>
          <td class="text-color-black-75">{{ item.name }}</td>
          <td class="text-color-black-75">
            {{
              formatDate(item.updatedAt).day +
              '.' +
              formatDate(item.updatedAt).month +
              '.' +
              formatDate(item.updatedAt).year
            }}
          </td>
          <td class="table__button">
            <ButtonWrapper :align-as-row="true">
              <template #buttons>
                <ButtonType
                  :btn-class="'btn-light btn-light--success'"
                  :btn-text="'Aufstellung laden'"
                  :type-button="true"
                  @click="handleLoadFormation(item.id)"
                />
                <ButtonType
                  :btn-class="'btn-light btn-light--error'"
                  :btn-text="'Aufstellung löschen'"
                  :type-button="true"
                  @click="deleteLineUpById(item.id)"
                />
              </template>
            </ButtonWrapper>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/helpers/formatDate';
import { useLineUpResponses } from '@/composables/useLineUpResponses.ts';
import { LoadedLineUpSelectionNames } from '@/interface';
import ButtonType from '@/components/ButtonType.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';

const { deleteLineUpById } = useLineUpResponses();
const emits = defineEmits(['loadLineUp']);

const handleLoadFormation = (id: number) => {
  emits('loadLineUp', id);
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
    background: var(--gray-dark);
    color: var(--white);

    th {
      text-align: left;
      padding: rem(20px);
      font-weight: $font-weight-400;
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
          .button-wrapper {
            justify-content: flex-end;
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
