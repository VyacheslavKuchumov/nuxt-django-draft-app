// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    'vuetify-nuxt-module'
  ],
  runtimeConfig: {

    public: {
      // Public key exposed to client
      apiUrl: process.env.API_URL || 'http://127.0.0.1:8000',
    }
  }
})