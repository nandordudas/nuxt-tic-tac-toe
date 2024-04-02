import { consola } from 'consola'
import type { JWTPayload } from 'jose'

import type { UserWithPassword } from '~/types'

export default defineEventHandler(async (event) => {
  if (getCookie(event, 'token'))
    throw createError({ statusCode: 401, statusMessage: 'Already logged in' })

  const body = await readValidatedBody(event, userSchema.safeParse)

  if (!body.success) {
    consola.error(body.error.issues)
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const user = await getUserByEmail(body.data.email)

  ensurePassword(body.data.password, user.password)

  const config = useRuntimeConfig()
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
async function getUserByEmail(email: string): Promise<UserWithPassword> {
  return {
    email,
    id: 1,
    // TODO: remove mock password
    password: '1862047a04d2450f15dcfcdeb2a02d7288def043a3b386c509d07e92224ad7a8',
  }
}
