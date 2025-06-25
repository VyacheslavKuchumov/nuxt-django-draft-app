<!-- pages/index.vue -->
<template>
  <v-container fluid class="pa-4">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <!-- Hero Card -->
        <v-card elevation="2" class="pa-6">
          <v-card-title class="text-h3 text-center">
            Welcome to Test App
          </v-card-title>
          <v-card-text class="text-body-1 text-center">
            This is a mock index page built with Nuxt 3 and Vuetify.  
            Use the navigation drawer to explore other pages!
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn to="/about" color="primary" class="mx-2">
              Learn More
            </v-btn>
            <v-btn to="/contact" variant="text" class="mx-2">
              Contact Us
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional logic is required for this mock page
</script>

<style scoped>
/* Optional: tweak spacing for the hero section */
.pa-6 {
  padding: 2rem !important;
}
</style>
