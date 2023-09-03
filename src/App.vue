<script setup lang="ts">
import { useCartStore } from './store/cart'
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import FooterNavigation from '@/components/FooterNavigation.vue'
import PurchaseModal from '@/components/PurchaseModal.vue'

const cartStore = useCartStore()
</script>

<template>
  <v-app>
    <header-navigation></header-navigation>

    <v-main>
      <router-view />
    </v-main>

    <footer-navigation></footer-navigation>

    <purchase-modal v-model="cartStore.showPurchaseModal"></purchase-modal>
  </v-app>
</template>
