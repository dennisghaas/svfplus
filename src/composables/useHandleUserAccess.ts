import store from '@/store';

const waitForUserData = (): Promise<any> => {
  return new Promise((resolve) => {
    const checkUserData = () => {
      if (store.state.userData) {
        resolve(store.state.userData);
      } else {
        requestAnimationFrame(checkUserData); // Keeps checking until data is available
      }
    };
    checkUserData();
  });
};

const userAllowedToUseWebApp = async (router: any) => {
  try {
    const userData = await waitForUserData();
    if (!userData.userIsActivated) {
      store.login(false);
      router.push('/login');
    }
  } catch (error) {
    console.error('Error waiting for userData:', error);
    router.push('/login');
    store.login(false);
  }
};

export function useHandleUserAccess() {
  return {
    userAllowedToUseWebApp,
  };
}
