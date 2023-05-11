import router from '@/router'
export const getQueryParam = () => {
  const route: any = router.currentRoute
  if (route.value?.query) {
    return route.value.query
  } else {
    return {}
  }
}
// vue router
export const routerPush = (name, params) => {
  let data = {}
  if (params) {
    data = params
  } else {
    data = {}
  }
  router.push({
    name,
    query: data
  })
}
export const routerReplace = (name, params) => {
  let data = {}
  if (params) {
    data = JSON.stringify(params)
  } else {
    data = {}
  }
  router.replace({
    name,
    query: data
  })
}

export const routeInfo = () => {
  return router.currentRoute
}
export const routerBack = () => {
  router.go(-1)
}
