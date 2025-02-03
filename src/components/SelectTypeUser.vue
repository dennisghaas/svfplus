<template>
  <fieldset>
    <label class="typo-label" :for="selectID">
      {{ selectTitle }}
    </label>

    <div class="select-wrapper">
      <select
        class="select"
        :name="selectName"
        :id="selectID"
        @change="emitSelection"
      >
        <option :value="selectPlaceholder" selected>
          {{ selectPlaceholder }}
        </option>
        <template v-for="user in completeUserData" :key="user.id">
          <option
            v-if="
              user.id !== 1 &&
              user.username !== 'admin123' &&
              user.username !== 'admin' &&
              !selectedUsers.includes(`${user.id}`)
            "
            :value="user.id"
          >
            {{ user.name }}
          </option>
        </template>
      </select>

      <i class="icon-chevron-down"></i>
    </div>
  </fieldset>

  <div v-if="selectedUsers.length > 0" class="overview-non-selected-player">
    <span class="typo-label"> Nicht nominierte Spieler </span>
    <ul class="blanklist">
      <li v-for="user in selectedUsers" :key="user">
        <button type="button" @click="removeUser(parseInt(user))">
          <span>{{ resolveIDToName(parseInt(user)) }}</span>
          <i class="icon-close"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUser } from '@/composables/useUser.ts';

const props = defineProps({
  selectID: {
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
  selectTitle: {
    type: String,
    default: '',
  },
  selectedUsers: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits<{
  (e: 'update:selection', value: string[]): void;
}>();

const selectedUsers = ref<string[]>(props.selectedUsers);

// Funktion zum Verarbeiten der Auswahl
const emitSelection = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;

  if (!selectedUsers.value.includes(selectedValue)) {
    selectedUsers.value.push(selectedValue);
  }

  // Emit die gesamte Liste der ausgewählten IDs
  emit('update:selection', selectedUsers.value);
};

// Methode zur Umwandlung von ID in Namen
const resolveIDToName = (id: number): string => {
  const user = completeUserData.value?.find((user) => user.id === id);
  return user ? user.name : 'Unknown';
};

const removeUser = (id: number) => {
  selectedUsers.value = selectedUsers.value.filter(
    (user) => parseInt(user) !== id
  );
  emit('update:selection', selectedUsers.value);
};

const getInjuredPlayers = () => {
  if (completeUserData.value) {
    const injuredPlayers = completeUserData.value
      .filter((user) => user.isInjured)
      .map((user) => `${user.id}`);
    selectedUsers.value.push(...injuredPlayers);
    emit('update:selection', selectedUsers.value);
  }
};

// Fetch Daten und Fehlerbehandlung
const { fetchAllUsers, completeUserData } = useUser();

onMounted(() => {
  fetchAllUsers()
    .then(() => {
      getInjuredPlayers();
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
});
</script>

<style scoped lang="scss">
@import '@/styles/components/select';

.overview-non-selected-player {
  margin-bottom: rem(40px);

  > span {
    padding-bottom: rem(10px);
    margin-bottom: rem(10px);
    border-bottom: 1px solid var(--border-color);
  }

  li {
    margin-bottom: rem(10px);

    @include media-breakpoint-up(lg) {
      span,
      [class*='icon-'] {
        transition: $transition-fast;
      }

      &:hover {
        span,
        [class*='icon-'] {
          color: var(--primary);
        }
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      color: var(--black-50);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  [class*='icon-'] {
    color: var(--gray-dark);
    font-size: $font-size-10;
  }
}
</style>
