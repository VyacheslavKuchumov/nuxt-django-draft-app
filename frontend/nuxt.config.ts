
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/test-utils',
    "@prisma/nuxt"
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})