// nuxt.config.ts

import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // still need to transpile Vuetify into your build
  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [
      // auto-import SFCs, directives & styles
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls: {
          // if you need to transform imgs in Vuetify components
          ...vuetify.transformAssetUrls,
        },
      },
    },
  },
})
