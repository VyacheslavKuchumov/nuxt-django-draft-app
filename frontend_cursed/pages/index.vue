<!-- pages/index.vue -->
<template>
  <v-container fluid class="pa-4">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" align="center">
        <!-- Hero Card -->
        <v-card elevation="2" class="pa-6" max-width="600">
          <v-card-title class="text-h3 text-center text-wrap">
            Добро пожаловать!
          </v-card-title>
          <v-card-text class="text-body-1 text-justify">
            Это макет full-stack приложения на Nuxt 3 с Vuetify.
            В качестве базы данных используется Postgres, а для ORM - Prisma.
          </v-card-text>
          <!-- v-list для кнопок v-btn с навигацией -->
          <v-list>
            <v-list-item v-for="page in pages" :key="page.name">
              <v-btn :to="page.path" color="primary" width="50%">{{ page.name }}</v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>


const pages = ref([
  { name: 'Клиенты', path: '/customers' },
  { name: 'Заказы', path: '/orders' },
  { name: 'Продукты', path: '/products' }
]);
</script>

<style scoped>
/* Optional: tweak spacing for the hero section */
.pa-6 {
  padding: 2rem !important;
}
</style>
