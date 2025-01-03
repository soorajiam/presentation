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
  nitro: {
    preset: 'cloudflare-pages',
    output: {
      dir: 'dist',
      serverDir: 'dist/server',
      publicDir: 'dist/public'
    },
    experimental: {
      database: true
    },
    database: {
      myDatabase: {
        connector: 'cloudflare-d1',
        options: {
          bindingName: 'quiz-db',
          migrations: {
            dir: './server/database/migrations'
          }
        }
      }
    }
  },
  experimental: {
    payloadExtraction: false
  },
  app: {
    buildAssetsDir: '/_nuxt/'
  }
})
