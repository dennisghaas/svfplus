import { reactive, readonly } from 'vue'
import { steps } from '../config.ts'

const state = reactive({
  userData: null as any,
  isLoggedIn: false,
  isRegisterSuccess: false,
  loadData: false,
  menuOpen: false,
  pageHeadline: '',
  createCardSelected: ['meta'],
  loadingResponse: false,
  loadingResponseText: '',
})

const setUserData = (data: any) => {
  state.userData = data
}

const setRegisterSuccess = (success: boolean) => {
  return success
}

const login = (status: boolean) => {
  state.isLoggedIn = status
}

const loadData = (status: boolean) => {
  state.loadData = status
}

const logout = () => {
  state.isLoggedIn = false
}

const menuOpen = (status: boolean) => {
  state.menuOpen = status
}

const pageHeadline = (headline: string) => {
  state.pageHeadline = headline
}

const updateCreateCardSelected = (stepId: string) => {
  if (stepId === 'meta') {
    state.createCardSelected = ['meta']
  } else {
    const stepsOrder = steps.map((step) => step.id)
    const stepIndex = stepsOrder.indexOf(stepId)

    if (stepIndex > -1) {
      state.createCardSelected = stepsOrder.slice(0, stepIndex + 1)
    }
  }
}

const resetCreateCardSelected = () => {
  state.createCardSelected = ['meta']
}

const updateOverflowHidden = (hidden: boolean) => {
  const body = document.querySelector('body')
  if (hidden) {
    body?.classList.add('overflow-hidden')
  } else {
    body?.classList.remove('overflow-hidden')
  }
}

const updateLoadingResponse = (response: boolean) => {
  state.loadingResponse = response
}

const updateLoadingResponseText = (text: string) => {
  state.loadingResponseText = text
}

const updateIsRegisterSuccess = (status: boolean) => {
  state.isRegisterSuccess = status
}

export default {
  state: readonly(state),
  setUserData,
  logout,
  setRegisterSuccess,
  login,
  loadData,
  menuOpen,
  pageHeadline,
  updateCreateCardSelected,
  resetCreateCardSelected,
  updateOverflowHidden,
  updateLoadingResponse,
  updateLoadingResponseText,
  updateIsRegisterSuccess,
}
