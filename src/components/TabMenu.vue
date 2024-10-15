<template>
  <div class="tab-menu">
    <nav class="tab-menu--nav">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="setActiveTab(index)"
        >
          {{ tab }}
        </li>
      </ul>
    </nav>

    <div class="tab-menu--body">
      <!-- This slot will render content based on the active tab -->
      <slot :name="`tab-${activeTab}`"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props for the tabs to be passed from the parent
defineProps({
  tabs: {
    type: Array as () => string[],
    required: true,
  },
})

// Emits to send events to the parent
const emit = defineEmits(['update:activeTab'])

// State to track the active tab
const activeTab = ref(0)

// Function to change the active tab and emit the event
const setActiveTab = (index: number) => {
  activeTab.value = index
  emit('update:activeTab', index) // Emit the active tab to the parent
}
</script>

<style scoped lang="scss">
.tab-menu--nav ul {
  display: flex;
  list-style: none;
}

.tab-menu--nav li {
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.2s ease;
}

.tab-menu--nav li.active {
  background-color: #ddd;
}

.tab-menu--body {
  margin-top: 20px;
}
</style>
