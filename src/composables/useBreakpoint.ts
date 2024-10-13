import { ref, onMounted, onUnmounted, computed } from 'vue'
import { breakpoints } from '../config.ts'

export function useBreakpoint() {
  // Ref für die Breakpoints-Status
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  // Funktion zur Überprüfung der Breakpoints
  function checkBreakpoints() {
    isMobile.value = window.matchMedia(breakpoints.xs).matches
    isTablet.value =
      window.matchMedia(breakpoints.sm).matches ||
      window.matchMedia(breakpoints.md).matches
    isDesktop.value =
      window.matchMedia(breakpoints.lg).matches ||
      window.matchMedia(breakpoints.xl).matches ||
      window.matchMedia(breakpoints.xxl).matches
  }

  // Event-Listener für Fenstergröße hinzufügen
  function handleResize() {
    checkBreakpoints()
  }

  // Setup-Funktion, um die Medienabfragen zu überprüfen und Event-Listener hinzuzufügen
  onMounted(() => {
    checkBreakpoints()
    window.addEventListener('resize', handleResize)
  })

  // Cleanup-Funktion, um Event-Listener zu entfernen
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile: computed(() => isMobile.value),
    isTablet: computed(() => isTablet.value),
    isDesktop: computed(() => isDesktop.value),
  }
}
