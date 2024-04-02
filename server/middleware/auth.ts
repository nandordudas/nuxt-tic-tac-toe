import { consola } from 'consola'

import { verifyToken } from '~/utils/verify-token'

export default defineEventHandler(async (event) => {
  consola.info('Server middleware auth')

  const token = getCookie(event, 'token')

  if (!token || !event.node.req.url?.startsWith('/api'))
    return consola.info('User not logged in or not in API route')

  const config = useRuntimeConfig()

  try {
    const result = await verifyToken(token, config.jwtSecret)

    consola.info('Decoded JWT')

    event.context.auth = result.payload
  }
  catch (error) {
    consola.error(error)
  }
})
