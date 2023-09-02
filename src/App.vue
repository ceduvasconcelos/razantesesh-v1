<script setup lang="ts">
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import FooterNavigation from '@/components/FooterNavigation.vue'
</script>

<template>
  <v-app>
    <header-navigation></header-navigation>

    <v-main>
      <router-view />
    </v-main>

    <footer-navigation></footer-navigation>
  </v-app>
</template>
