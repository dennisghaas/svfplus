import store from '../store'

export function useHandleNextCreateForm() {
  const handleNextForm = (nextID: string) => {
    store.updateCreateCardSelected(nextID)

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  return {
    handleNextForm,
  }
}
