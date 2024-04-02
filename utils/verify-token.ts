import { consola } from 'consola'
import { type JWTVerifyResult, jwtVerify } from 'jose'

import type { User } from '~/types'

export async function verifyToken(data: string, secret: string): Promise<JWTVerifyResult<User>> {
  const key = new TextEncoder().encode(secret)

  consola.info('Verifying JWT')

  return await jwtVerify(data, key)
}
