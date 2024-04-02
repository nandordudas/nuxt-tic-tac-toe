import { consola } from 'consola'
import { type JWTPayload, SignJWT } from 'jose'

export function signToken(data: JWTPayload | undefined, secret: string): Promise<string> {
  const alg = 'HS256'
  const key = new TextEncoder().encode(secret)

  consola.info('Signing JWT')

  return new SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key)
}
