import type { User } from './types'

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    jwtSecret: string
  }
}

declare module 'h3' {
  interface H3EventContext {
    auth: User | null
  }
}

export {}
