<script setup lang="ts">
import HeaderNavigation from './components/HeaderNavigation.vue'
</script>

<template>
  <v-app>
    <v-main>
      <HeaderNavigation />

      <router-view />
    </v-main>
  </v-app>
</template>
