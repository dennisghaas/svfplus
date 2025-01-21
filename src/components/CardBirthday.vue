<template>
  <CardFrame
    :card-header-b-g="convertCustomProperties(birthdayUser.userImage.bgColor)"
    :hide-header-right="true"
  >
    <template #cardHeaderLeft>
      <div class="card--header__left--birthday">
        <ProfilePanel
          :bg-color="birthdayUser.userImage.bgColor"
          :user-initials="birthdayUser.userImage.initials"
          :hide-initials="birthdayUser.userImage.hideInitials"
          :user-name="birthdayUser.userImage.name"
          :is-image="!birthdayUser.userImage.bgColor.includes('--')"
          :add-border="true"
        />
        <div class="body-text-b2">
          <h4>
            Alles Gute
            <strong>{{ textTruncate(birthdayUser.name, 10) }}</strong> 🥳
          </h4>
        </div>
      </div>
    </template>

    <template #cardBody>
      <template v-if="store.state.userData.id === birthdayUser.id">
        <div class="body-text-b3">
          <p>
            Zur <strong>Feier des Tages</strong> würde sich deine
            <strong>Mannschaft</strong> über ein paar
            <strong>Kaltgetränke</strong> freuen 🚀
          </p>
        </div>
      </template>
      <template v-else>
        <div class="body-text-b3">
          <p>
            Sieht so aus als würde {{ textTruncate(birthdayUser.name, 10) }} ein
            paar <strong>Kaltgetränke</strong> mitbringen.<br />
            <strong>Gratuliere</strong> ihm zu seinem
            <strong>{{ birthdayUser.age }}</strong
            >. Geburtstag 🚀
          </p>
        </div>
      </template>
    </template>
  </CardFrame>
</template>

<script setup lang="ts">
import { textTruncate } from '@/helpers/textTruncate.ts';
import store from '@/store';
import CardFrame from '@/components/CardFrame.vue';
import { BirthdayObject } from '@/interface';
import ProfilePanel from '@/components/ProfilePanel.vue';

const convertCustomProperties = (property: string) => {
  if (property.includes('svg') || property.includes('png')) {
    return 'bg-blue-primary';
  }

  return `bg-${property.slice(2)}`;
};

defineProps({
  birthdayUser: {
    type: Object as () => BirthdayObject,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
