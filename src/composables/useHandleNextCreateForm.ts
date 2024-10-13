import store from '../store'

export function useHandleNextCreateForm() {
  const handleNextForm = (nextID: string) => {
    store.updateCreateCardSelected(nextID)
  }

  return {
    handleNextForm,
  }
}
