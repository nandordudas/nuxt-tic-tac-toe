import { consola } from 'consola'

export default defineEventHandler((event) => {
  if (!event.context.auth) {
    consola.info('User not logged in')

    return
  }

  deleteCookie(event, 'token')
  consola.success('User logged out')
})
