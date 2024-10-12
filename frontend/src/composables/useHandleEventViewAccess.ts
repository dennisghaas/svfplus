export const useHandleEventViewAccess = () => {
  const addQueryParams = (
    route: any,
    router: any,
    params: Record<string, string>,
  ) => {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        ...params,
      },
    })
  }

  return {
    addQueryParams,
  }
}
