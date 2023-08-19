<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { useCartStore } from '@/store/cart'
import ProductCard from '@/components/ProductCard.vue'

const appStore = useAppStore()
const cartStore = useCartStore()
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-parallax class="rounded-lg">
          <v-img
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            :height="400"
            cover
          ></v-img>
        </v-parallax>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div class="d-flex align-baseline">
          <h1 class="text-h5 text-no-wrap font-weight-black me-2">Mais vendidos</h1>

          <v-icon
            color="error"
            icon="mdi-fire-circle"
            class="me-1"
          ></v-icon>

          <v-divider></v-divider>
        </div>
      </v-col>

      <v-col
        v-for="product in appStore.products"
        :key="product.id"
        cols="12"
        sm="4"
        md="3"
        class="pb-0"
      >
        <ProductCard
          :product="product"
          @onBuying="cartStore.add"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-btn
          variant="plain"
          rounded="lg"
          text="Ver todos os produtos"
          class="mt-2"
          block
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
