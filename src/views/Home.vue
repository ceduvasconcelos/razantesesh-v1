<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { useCartStore } from '@/store/cart'
import ProductCard from '@/components/ProductCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'

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
    <v-row>
      <v-col cols="12">
        <section-title title="Mais vendidos" icon="mdi-fire-circle"></section-title>
      </v-col>
    </v-row>

    <v-row justify="center" dense>
      <v-col
        v-for="product in appStore.bestSellers"
        :key="product.id"
        cols="6"
        sm="4"
        md="3"
        class="mb-4"
      >
        <product-card
          :product="product"
          @onBuying="cartStore.add"
        ></product-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4" dense>
      <v-col cols="12" md="6">
        <v-btn
          :to="{ name: 'Products' }"
          variant="text"
          rounded="lg"
          text="Ver todos os produtos"
          block
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
