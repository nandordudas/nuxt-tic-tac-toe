export default defineNuxtRouteMiddleware((to) => {
  const user = useUser()

  if (!user.value.email)
    return

  if (to.path === '/login')
    return navigateTo('/dashboard')
})
