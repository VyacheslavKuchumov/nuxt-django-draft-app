// plugins/vuetify.ts
import { defineNuxtPlugin } from '#app'
import { createVuetify }      from 'vuetify'
import * as components        from 'vuetify/components'
import * as directives        from 'vuetify/directives'
// Vuetify’s global styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: true,         // ensure SSR works
    icons: {
      defaultSet: 'mdi',
    },
    // you can customize themes here
  })

  nuxtApp.vueApp.use(vuetify)
})
