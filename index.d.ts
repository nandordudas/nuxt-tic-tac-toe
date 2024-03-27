declare module 'nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
  }

  interface PublicRuntimeConfig {
    apiBase: string
  }

  interface AppConfigInput {
    foo: string
  }
}

declare module '#app' {
  interface PageMeta {
    pageType?: string
  }
}

export {}
