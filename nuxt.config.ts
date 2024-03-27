import type { Awaitable } from '@antfu/eslint-config'

import { access, constants } from 'node:fs/promises'

interface DevServerHttps {
  cert: string
  key: string
}

const httpsServerFiles: DevServerHttps = {
  cert: import.meta.env.DEV_SERVER_CERT,
  key: import.meta.env.DEV_SERVER_KEY,
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

async function isReadable(path: string): Promise<boolean> {
  return access(path, constants.R_OK)
    .then(() => true)
    .catch(() => false)
}
