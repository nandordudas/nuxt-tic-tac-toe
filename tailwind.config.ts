import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        tomato: {
          100: '#ffe3e3',
          200: '#ffcaca',
          300: '#ffa8a8',
          400: '#ff9494',
          50: '#fff0f0',
        },
      },
    },
  },
}
