import { consola } from 'consola'

import { createHash } from 'node:crypto'

export function ensurePassword(password: string, hash: string): never | void {
  const algorithm = 'sha256'
  const result = createHash(algorithm).update(password).digest('hex')

  consola.info('Comparing password hash')

  if (result !== hash)
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
}
