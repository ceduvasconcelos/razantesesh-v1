<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import AppNavigation from '@/components/AppNavigation.vue'
import { ref } from 'vue'

const cartStore = useCartStore()

const appNavigation = ref(false)
</script>

<template>
  <v-app-bar border flat density="compact">
    <template #prepend>
      <router-link :to="{ name: 'Home' }">
        <v-img
          aspect-ratio="16/9"
          src="@/assets/logo.jpeg"
          width="95px"
          height="50px"
        ></v-img>
      </router-link>

      <v-app-bar-nav-icon density="comfortable" @click="appNavigation = ! appNavigation"></v-app-bar-nav-icon>
    </template>

    <template #append>
      <v-btn
        :to="{ name: 'Cart' }"
        :active="false"
        variant="text"
        rounded="lg"
      >
        <v-badge
          v-if="cartStore.quantity"
          color="error"
          :content="cartStore.quantity"
          bordered
          offset-x="-2"
          offset-y="-2"
        >
          <v-icon size="large">mdi-cart-outline</v-icon>
        </v-badge>

        <v-icon v-else size="large">mdi-cart-outline</v-icon>

        <span class="ms-4">R$ {{ cartStore.total }},00</span>
      </v-btn>
    </template>
  </v-app-bar>

  <app-navigation v-model="appNavigation"></app-navigation>
</template>
