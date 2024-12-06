<template>
  <ul class="blanklist color-picker">
    <template v-for="color in accessibleColors" :key="color.color">
      <li
        :class="{
          'is-selected': onReload
            ? selectedColor.color === color.color
            : userImageBgColor === color.color,
        }"
      >
        <button
          type="button"
          @click="handleColorPicker(color)"
          :style="
            !color.image
              ? { '--color-picker': `var(${color.color})` }
              : { '--background-image-path': `url(${color.color})` }
          "
          :title="`${color.name} als Profilhintergrundfarbe auswählen`"
        >
          <span
            :class="[
              'color-picker__picker-circle',
              { 'color-picker__picker-circle-image': color.image },
            ]"
          >
          </span>
          <span>{{ color.name }}</span>
        </button>
      </li>
    </template>
    <template v-for="image in accessibleProfileImages">
      <li
        v-if="toLowercase(image.username).includes(toLowercase(username))"
        :class="{
          'is-selected': onReload
            ? selectedColor.color === image.color
            : userImageBgColor === image.color,
        }"
      >
        <button
          type="button"
          @click="handleColorPicker(image)"
          :style="
            !image.image
              ? { '--color-picker': `var(${image.color})` }
              : { '--background-image-path': `url(${image.color})` }
          "
          :title="`${image.name} als Profilhintergrundfarbe auswählen`"
        >
          <span
            :class="[
              'color-picker__picker-circle',
              { 'color-picker__picker-circle-image': image.image },
            ]"
          >
          </span>
          <span>
            <template v-if="isCurrentUsersProfile"> Dein Bild </template>
            <template v-else>
              {{ image.name }}
            </template>
          </span>
        </button>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import store from '@/store';
import { onMounted, ref } from 'vue';
import { useUser } from '@/composables/useUser.ts';
import { UserData, Color } from '@/interface';
import { accessibleProfileImages } from '@/config/accessibleProfileImages.ts';
import { accessibleColors } from '@/config/accessibleColors.ts';

const { getUserByID, selectedUser } = useUser();
const getSelectedUser = ref<UserData | null>(null);
const userImageBgColor = ref('');
const onReload = ref(false);

const toLowercase = (name: string) => {
  return name.toLowerCase();
};

const props = defineProps({
  selectedColor: {
    type: Object,
    default: () => ({}),
  },
  id: {
    type: Number,
    default: 0,
  },
  isCurrentUsersProfile: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:selectedColor']);

const handleColorPicker = (color: Color) => {
  onReload.value = true;
  emit('update:selectedColor', color); // Hier das ganze color Objekt übergeben
};

onMounted(async () => {
  await getUserByID(props.id);
  getSelectedUser.value = selectedUser.value;

  if (getSelectedUser.value && getSelectedUser.value.userImage) {
    userImageBgColor.value = getSelectedUser.value.userImage.bgColor;
  } else {
    userImageBgColor.value = '';
  }
});
</script>

<style scoped lang="scss">
.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: rem(10px);
  margin-top: rem(20px);

  li {
    button {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid var(--border-color);
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        &:not(.color-picker__picker-circle) {
          font-size: $font-size-14;
          margin-left: rem(5px);
        }

        &.color-picker__picker-circle {
          width: 32px;
          height: 32px;
          display: block;
          border-radius: 50%;
          background: var(--color-picker);
          border: 2px solid var(--white);
          background-size: contain;

          &-image {
            background-image: var(--background-image-path);
          }
        }
      }

      &:hover {
        background: var(--gray-very-soft);
      }
    }

    &.is-selected {
      button {
        background: var(--gray-very-soft);
      }
    }
  }
}
</style>
