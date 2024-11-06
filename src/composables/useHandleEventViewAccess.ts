import { Router, RouteLocationNormalized } from 'vue-router';

export const useHandleEventViewAccess = () => {
  const addQueryParams = (
    route: RouteLocationNormalized,
    router: Router,
    params: Record<string, string>
  ) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        ...params,
      },
    });
  };

  return {
    addQueryParams,
  };
};
