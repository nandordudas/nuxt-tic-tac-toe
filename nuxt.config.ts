import { accessSync, constants } from 'node:fs'
import { env } from 'node:process'

interface DevServerHttps {
  cert: string
  key: string
}

// const { pathname: srcRoot } = new URL('.', import.meta.url)

const httpsServerFiles: DevServerHttps = {
  cert: env.DEV_SERVER_CERT,
  key: env.DEV_SERVER_KEY,
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // https://nuxt.com/docs/getting-started/seo-meta
    head: {
      titleTemplate: '%s - Tic Tac toe',
    },
  },

  devServer: {
    https: Object.values(httpsServerFiles).every(isReadable) ? httpsServerFiles : false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
  ],

  // https://nuxt.com/docs/guide/going-further/runtime-config
  runtimeConfig: {
    app: {
      apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    },
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },

  testUtils: {
    vitestConfig: {
      environment: 'happy-dom',
      globals: true,
    },
  },
})

function isReadable(path: string): boolean {
  const accessMode = constants.R_OK

  try {
    return accessSync(path, accessMode) === undefined
  }
  catch {
    return false
  }
}
