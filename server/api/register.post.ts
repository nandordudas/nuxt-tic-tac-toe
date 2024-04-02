import { consola } from 'consola'
import type { JWTPayload } from 'jose'

import type { User, UserWithPassword } from '~/types'

export default defineEventHandler(async (event) => {
  if (event.context.auth)
    throw createError({ statusCode: 401, statusMessage: 'Already logged in' })

  const config = useRuntimeConfig()
  const body = await readValidatedBody(event, userSchema.safeParse)

  if (!body.success) {
    consola.error(body.error.issues)
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const user = await createUser(body.data)
  const token = await signToken({ ...user } satisfies JWTPayload, config.jwtSecret)

  setCookie(event, 'token', token, {
    httpOnly: true,
    maxAge: ONE_HOUR_IN_SECONDS,
    sameSite: 'strict',
    secure: true,
  })

  setResponseHeader(event, 'Accept', 'application/vnd.api+json')

  return {
    data: { success: true },
    errors: null,
  } as const
})

// TODO: move mock to a separate file
async function createUser(user: Omit<UserWithPassword, 'id'>): Promise<User> {
  return { email: user.email, id: 0 }
}
