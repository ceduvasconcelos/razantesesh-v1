<script setup lang="ts">
import { useAppStore } from '@/store/app'
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import FooterNavigation from '@/components/FooterNavigation.vue'
import PurchaseModal from '@/components/PurchaseModal.vue'

const appStore = useAppStore()
</script>

<template>
  <v-app>
    <header-navigation></header-navigation>

    <v-main>
      <router-view></router-view>
    </v-main>

    <footer-navigation></footer-navigation>

    <purchase-modal v-model="appStore.showPurchaseModal"></purchase-modal>
  </v-app>
</template>
