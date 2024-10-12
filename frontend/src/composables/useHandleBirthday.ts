import { ref } from 'vue'
import { formatDate } from '../helpers/formatDate.ts'
import { formatMonth } from '../helpers/formatMonth.ts'
import { BirthdayEntry } from '../interface'

export const thisUserID = ref<number[]>([])
export const nextBirthdays = ref<BirthdayEntry[]>([])

const usersBirthday = (birthday: string) => {
  const {
    day: userBirthDay,
    month: userBirthMonth,
    year: userBirthYear,
  } = formatDate(birthday)
  const { day: tdDay, month: tdMonth, year: tdYear } = formatDate(new Date())

  return {
    userBirthDay,
    userBirthMonth: formatMonth(userBirthMonth),
    userBirthYear,
    tdDay,
    tdMonth: formatMonth(tdMonth),
    tdYear,
  }
}

export const getAge = (birthday: string): number => {
  const {
    userBirthDay,
    userBirthMonth,
    userBirthYear,
    tdDay,
    tdMonth,
    tdYear,
  } = usersBirthday(birthday)
  let age = parseInt(tdYear) - parseInt(userBirthYear)

  if (
    parseInt(tdMonth) < parseInt(userBirthMonth) ||
    (parseInt(tdMonth) === parseInt(userBirthMonth) &&
      parseInt(tdDay) < parseInt(userBirthDay))
  ) {
    age--
  }

  return age
}

export function useHandleBirthday() {
  const getTodayBirthday = (birthday: string, userID: number) => {
    const { userBirthDay, userBirthMonth, tdDay, tdMonth } =
      usersBirthday(birthday)

    if (userBirthDay === tdDay && userBirthMonth === tdMonth) {
      thisUserID.value.push(userID)
    }
  }

  const getNextBirthdays = (birthday: string, userID: number) => {
    const { userBirthDay, userBirthMonth, tdDay, tdMonth } =
      usersBirthday(birthday)

    const buildBirthday = `${userBirthDay}.${userBirthMonth}.`
    const buildToday = `${tdDay}.${tdMonth}.`

    if (buildBirthday !== buildToday) {
      nextBirthdays.value.push({ userID, buildBirthday })
    }
  }

  return {
    getTodayBirthday,
    getNextBirthdays,
    thisUserID,
    nextBirthdays,
  }
}
