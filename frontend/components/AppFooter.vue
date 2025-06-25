<template>
  <v-footer
    color="primary"
    app
    class="d-flex flex-column align-center justify-center text-white"
  >
    <div class="text-body-2">&copy; {{ currentYear }} — Test App</div>
    <div class="text-caption">
      Made with ❤️ using Nuxt 3 + Vuetify
    </div>
  </v-footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
