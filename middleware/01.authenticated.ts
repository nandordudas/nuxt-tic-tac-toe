export default defineNuxtRouteMiddleware((to) => {
  const user = useUser()

  if (user.value.email) {
    if (to.path === 'login')
      return navigateTo('/dashboard')

    return
  }

  return navigateTo({
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  })
})
