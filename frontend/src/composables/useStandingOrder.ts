import { ref } from 'vue'
const targetDay = ref<number | null>(null)

// Hilfsfunktion zum Formatieren von Date-Objekten für input[type="date"]
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Hilfsfunktion zum Erstellen eines Arrays aller gewünschten Wochentage zwischen zwei Daten
const getSpecificWeekdayBetween = (
  startDate: Date,
  endDate: Date,
  targetDay: number | null,
): string[] => {
  if (targetDay === null || targetDay < 0 || targetDay > 6) {
    console.error('Invalid target day:', targetDay)
    return []
  }

  const dateArray: string[] = []
  let currentDate = new Date(startDate)

  // Find the first desired weekday
  while (currentDate.getDay() !== targetDay) {
    currentDate.setDate(currentDate.getDate() + 1)
  }

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    dateArray.push(`${year}-${month}-${day}`)
    currentDate.setDate(currentDate.getDate() + 7)
  }

  return dateArray
}

export function useStandingOrder() {
  const startDate = ref(new Date())
  const endDate = ref(new Date())
  const formattedStartDate = ref(formatDateForInput(startDate.value))
  const formattedEndDate = ref(formatDateForInput(endDate.value))

  // Funktion zur Berechnung der Daten für den Dauerauftrag
  const calculateStandingOrderDates = () => {
    if (!startDate.value || !endDate.value || startDate.value > endDate.value) {
      return []
    }
    return getSpecificWeekdayBetween(
      startDate.value,
      endDate.value,
      targetDay.value,
    )
  }

  return {
    targetDay,
    startDate,
    endDate,
    formattedStartDate,
    formattedEndDate,
    calculateStandingOrderDates,
  }
}
