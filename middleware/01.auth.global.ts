import { consola } from 'consola'

export default defineNuxtRouteMiddleware(async () => {
  consola.info('Middleware 01.auth.global')

  const token = useCookie('token')

  if (!token.value)
    return

  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  try {
    const result = await verifyToken(token.value, config.jwtSecret)

    consola.info('Decoded JWT')

    authStore.isAuthenticated = true
    authStore.user = result.payload
  }
  catch (error) {
    consola.error(error)

    authStore.isAuthenticated = false
  }
})
