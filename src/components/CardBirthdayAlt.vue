<template>
  <CardFrame :card-header-b-g="'bg-blue-primary'">
    <template #cardHeaderLeft>
      <div class="card--header__left--birthday">
        <ProfilePanel
          :bg-color="birthdayUser.userImage.bgColor"
          :user-initials="birthdayUser.userImage.initials"
          :user-name="birthdayUser.userImage.name"
          :is-image="!birthdayUser.userImage.bgColor.includes('--')"
          :add-border="true"
        />
        <h4>
          {{ textTruncate(birthdayUser.name, 10) }}
        </h4>
      </div>
    </template>
    <template #cardHeaderRight>
      <CardViewCalendar
        :day="formattedDate.day"
        :month="formattedDate.month"
        :weekday="formattedDate.weekday"
      />
    </template>
    <template #cardBody>
      <div class="body-text-b3">
        <p>
          [...] wird am {{ formattedDate.weekday }}, den
          {{ formattedDate.day }}.{{ formattedDate.month }} -
          <strong>{{ birthdayUser.age }}&nbsp;Jahre</strong> alt
        </p>
      </div>
    </template>
  </CardFrame>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '@/helpers/formatDate.ts';
import { textTruncate } from '@/helpers/textTruncate.ts';
import { BirthdayObject } from '@/interface';
import CardFrame from '@/components/CardFrame.vue';
import CardViewCalendar from '@/components/CardViewCalendar.vue';
import ProfilePanel from '@/components/ProfilePanel.vue';

const props = defineProps({
  birthdayUser: {
    type: Object as () => BirthdayObject,
    required: true,
  },
});

const formattedDate = computed(() =>
  formatDate(new Date(props.birthdayUser.birthday).toISOString())
);
</script>

<style scoped lang="scss"></style>
