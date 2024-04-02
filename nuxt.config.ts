import { accessSync, constants } from 'node:fs'

interface DevServerHttps {
  cert: string
  key: string
}

const httpsServerFiles: DevServerHttps = {
  cert: import.meta.env.DEV_SERVER_CERT,
  key: import.meta.env.DEV_SERVER_KEY,
}

export default defineNuxtConfig({
  app: {
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

  experimental: {
    typedPages: true,
  },

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
  ],

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  runtimeConfig: {
    app: {
      jwtSecret: '',
    },
  },

  testUtils: {
    vitestConfig: {
      environment: 'happy-dom',
      globals: true,
    },
  },

  ui: {
    icons: ['simple-icons'],
  },
})

function isReadable(path: string | undefined): boolean {
  if (!path)
    return false

  try {
    accessSync(path, constants.R_OK)

    return true
  }
  catch {
    return false
  }
}
