import { consola } from 'consola'

export default defineNuxtRouteMiddleware(async (to) => {
  consola.info('Middleware 01.auth')

  if (import.meta.client)
    return

  const token = useCookie('token')

  if (!token.value) {
    abortNavigation()

    return await navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }

  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    await verifyToken(token.value, config.jwtSecret)

    consola.info('Decoded JWT')

    authStore.isAuthenticated = true
  }
  catch (error) {
    consola.error(error)

    authStore.isAuthenticated = false
  }
})
