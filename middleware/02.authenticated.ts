import { consola } from 'consola'

export default defineNuxtRouteMiddleware(() => {
  consola.info('Middleware 02.authenticated')

  const token = useCookie('token')

  if (!token.value)
    return

  return navigateTo({ path: '/dashboard' })
})
