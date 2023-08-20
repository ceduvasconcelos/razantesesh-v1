<script setup lang="ts">
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import FooterNavigation from '@/components/FooterNavigation.vue'
</script>

<template>
  <v-app>
    <HeaderNavigation />

    <v-main>
      <router-view />
    </v-main>

    <FooterNavigation />
  </v-app>
</template>
