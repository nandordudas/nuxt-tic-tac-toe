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

interface ImportMetaEnv {
  // readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_SERVER_CERT: string
      DEV_SERVER_KEY: string
    }
  }
}

export {}
