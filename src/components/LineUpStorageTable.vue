<template>
  <div class="table__wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Ersteller</th>
          <th>Name</th>
          <th>{{ isMobile ? 'Zuletzt' : 'Zuletzt bearbeitet' }}</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in storage.slice().reverse()" :key="item.id">
          <td class="text-color-black-75">{{ item.id }}</td>
          <td class="text-color-black-75">{{ item.author }}</td>
          <td class="text-color-black-75">{{ textTruncate(item.name, 18) }}</td>
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
                  :btn-text="isMobile ? 'Laden' : 'Aufstellung laden'"
                  :type-button="true"
                  @click="handleLoadFormation(item.id)"
                />
                <ButtonType
                  :btn-class="'btn-light btn-light--error'"
                  :btn-text="isMobile ? 'Löschen' : 'Aufstellung löschen'"
                  :type-button="true"
                  @click="handleDeleteLineUp(item.id)"
                />
              </template>
            </ButtonWrapper>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <WarningDialog
    :headline="'Achtung!'"
    :open="dialogState.open"
    @close="dialogState.open = false"
  >
    <template #DialogBody>
      <div class="body-text-b2 text-color-black-75">
        <p>
          Du bist dabei, eine Aufstellung zu löschen. Dieser Vorgang kann nicht
          rückgängig gemacht werden.
        </p>
      </div>
      <ButtonWrapper>
        <template #buttons>
          <ButtonType
            :btn-text="'Abbrechen'"
            :btn-class="'btn-secondary w-100'"
            :type-button="true"
            @click="dialogState.open = false"
          />
          <ButtonType
            :btn-text="'Aufstellung löschen'"
            :btn-class="'w-100'"
            :type-button="true"
            @click="handleDeleteLineUp(dialogState.deleteId)"
          />
        </template>
      </ButtonWrapper>
    </template>
  </WarningDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatDate } from '@/helpers/formatDate';
import { useLineUpResponses } from '@/composables/useLineUpResponses.ts';
import { useRouter } from 'vue-router';
import { useBreakpoint } from '@/composables/useBreakpoint.ts';
import { textTruncate } from '@/helpers/textTruncate.ts';
import { LoadedLineUpSelectionNames } from '@/interface';
import ButtonType from '@/components/ButtonType.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import WarningDialog from '@/components/WarningDialog.vue';

const { deleteLineUpById } = useLineUpResponses();
const emits = defineEmits(['loadLineUp']);
const { isMobile } = useBreakpoint();
const router = useRouter();

const dialogState = ref({
  open: false,
  deleteId: 0,
});

const handleDeleteLineUp = (id: number) => {
  if (dialogState.value.open) {
    deleteLineUpById(id, router);
    dialogState.value.open = false;
  } else {
    dialogState.value.open = true;
    dialogState.value.deleteId = id;
  }
};

const handleLoadFormation = (id: number) => emits('loadLineUp', id);

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
        padding: rem(20px);

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
