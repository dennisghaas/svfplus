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
  </ul>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useUser } from '@/composables/useUser.ts'
import { UserData } from '@/interface'

const { getUserByID, selectedUser } = useUser()
const getSelectedUser = ref<UserData | null>(null)
const userImageBgColor = ref('')
const onReload = ref(false)

const props = defineProps({
  selectedColor: {
    type: Object,
    default: () => [],
  },
  id: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:selectedColor'])
const accessibleColors = reactive([
  {
    color: '--warning-light',
    name: 'Gelb',
  },
  {
    color: '--blue-primary',
    name: 'Blau',
  },
  {
    color: '--blue-dark-gray',
    name: 'Dunkelblau',
  },
  {
    color: '--primary',
    name: 'Rot',
  },
  {
    color: '--success-mint',
    name: 'Minzgrün',
  },
  {
    color: '--purple',
    name: 'Lila',
  },
  {
    name: 'Derbysieger',
    color: '/images/hsv.svg',
    image: true,
  },
  {
    name: 'Kiezkicker',
    color: '/images/pauli.svg',
    image: true,
  },
  {
    name: 'Norderstedt',
    color: '/images/sh.svg',
    image: true,
  },
])

const handleColorPicker = (color: {
  color: string
  name: string
  image?: boolean
}) => {
  onReload.value = true
  emit('update:selectedColor', color.color)
}

onMounted(async () => {
  await getUserByID(props.id)
  getSelectedUser.value = selectedUser.value

  if (getSelectedUser.value) {
    userImageBgColor.value = getSelectedUser.value.userImage.bgColor
  } else {
    // Handle case when user data is not found (e.g., set a default value)
    userImageBgColor.value = '' // or some default color
  }
})
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
