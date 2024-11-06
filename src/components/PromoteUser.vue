<template>
  <div class="promote-user">
    <h3 class="promote-user__headline">{{ name }} zum...</h3>
    <fieldset
      class="checkbox"
      v-for="(role, index) in accessibleRoles"
      :key="index"
    >
      <input
        type="checkbox"
        :id="`${role}_${index}`"
        :name="`${role}${index}`"
        :value="role"
        :checked="newRoles.includes(role)"
        @change="updateRoles(role, $event)"
      />
      <label class="checkbox-label" :for="`${role}_${index}`">
        [...] {{ role }} befördern
      </label>
    </fieldset>

    <BadgeType
      v-if="throwError"
      :badge-text="'Es muss mindestens <q>Spieler</q> ausgewählt sein'"
      :badge-type="'error'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { accessibleRoles } from '@/config';
import BadgeType from '@/components/BadgeType.vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  roles: {
    type: Array as () => string[],
    default: () => [],
  },
  throwError: {
    type: Boolean,
    default: false,
  },
});

// Define emits
const emit = defineEmits<{
  (event: 'update-roles', roles: string[]): void;
}>();

const newRoles = computed(() => {
  return props.roles as string[]; // Explicitly define the type as string[]
});

// Function to update roles
const updateRoles = (role: string, event: Event) => {
  const target = event.target as HTMLInputElement; // Type assertion for target
  const isChecked = target.checked;

  let updatedRoles = [...newRoles.value];

  if (isChecked) {
    // Add role
    updatedRoles.push(role);
  } else {
    // Remove role
    updatedRoles = updatedRoles.filter((r) => r !== role);
  }

  emit('update-roles', updatedRoles);
};
</script>

<style lang="scss" scoped>
@import '@/styles/components/checkbox';

.promote-user {
  padding: rem(20px);
  border-radius: rem(10px);
  box-shadow: $box-shadow-large;
  margin: rem(20px) 0;

  &__headline {
    padding-bottom: rem(20px);
    margin-bottom: rem(5px);
    border-bottom: 1px solid var(--border-color);
  }

  .checkbox {
    border-bottom: 0;
  }

  .checkbox-label {
    padding: rem(15px) rem(67px) rem(15px) 0;

    @include media-breakpoint-up(md) {
      padding: rem(15px) 0;
    }
  }
}
</style>
