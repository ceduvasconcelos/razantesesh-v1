<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore()

const drawer = ref(false)
</script>

<template>
  <v-app-bar border flat density="compact">
    <template v-slot:prepend>
      <router-link :to="{ name: 'Home' }">
        <v-img
          aspect-ratio="16/9"
          src="@/assets/logo.jpeg"
          width="95px"
          height="50px"
        ></v-img>
      </router-link>
    </template>

    <template v-slot:append>
      <v-btn
        :to="{ name: 'Cart' }"
        :active="false"
        variant="text"
        rounded="lg"
      >
        <v-icon size="large">mdi-cart-outline</v-icon>

        <span class="ms-2">{{ cartStore.quantity }} | R$ {{ cartStore.total || 0 }},00</span>
      </v-btn>
    </template>
  </v-app-bar>
</template>
