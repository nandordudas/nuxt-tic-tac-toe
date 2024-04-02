import { consola } from 'consola'

export default defineEventHandler((event) => {
  if (!getCookie(event, 'token')) {
    consola.info('User not logged in')

    return
  }

  deleteCookie(event, 'token')
  consola.success('User logged out')
})
