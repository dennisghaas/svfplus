import store from '../store'

export function useHandleDropdownOnRouteLeave() {
  const handleRouteLeave = () => {
    if (store.state.menuOpen) {
      store.menuOpen(false)
      store.updateOverflowHidden(false)
    }
  }

  return {
    handleRouteLeave,
  }
}
