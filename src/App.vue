<script setup lang="ts">
import HeaderNavigation from './components/HeaderNavigation.vue'
import FooterNavigation from './components/FooterNavigation.vue'
</script>

<template>
  <v-app>
    <v-main>
      <HeaderNavigation />

      <router-view />

      <FooterNavigation />
    </v-main>
  </v-app>
</template>
