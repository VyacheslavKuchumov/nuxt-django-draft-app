<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    location="left"
    temporary
  >
    <v-list>
      <v-list-item to="/" exact>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item to="/about">
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
      <v-list-item to="/contact">
        <v-list-item-title>Contact</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>Test App</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>