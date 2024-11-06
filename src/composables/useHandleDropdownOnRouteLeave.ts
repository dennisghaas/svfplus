import store from '@/store';

export function useHandleDropdownOnRouteLeave() {
  const handleRouteLeave = () => {
    if (store.state.menuOpen) {
      store.menuOpen(false);
      store.updateOverflowHidden(false);

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  };

  return {
    handleRouteLeave,
  };
}
