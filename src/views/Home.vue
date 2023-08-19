<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { useCartStore } from '@/store/cart'
import ProductCard from '@/components/ProductCard.vue'

const appStore = useAppStore()
const cartStore = useCartStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in appStore.products"
        :key="product.id"
        cols="12"
        sm="4"
        md="3"
      >
        <ProductCard
          :product="product"
          @onBuying="cartStore.add"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
