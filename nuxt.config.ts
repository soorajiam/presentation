// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@primevue/nuxt-module'
  ],
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },
  vite: {
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: 'raw-loader'
        }
      ]
    }
  },
  nitro: {
    preset: 'node',
  },
  experimental: {
    payloadExtraction: false
  }
})
