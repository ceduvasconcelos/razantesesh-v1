<script setup lang="ts">
import { useAppStore } from '@/store/app'
import Product from '@/models/Product'
import ProductCard from '@/components/ProductCard.vue'
import SubSectionTitle from '@/components/SubSectionTitle.vue'

const appStore = useAppStore()
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-img
          class="rounded-lg"
          aspect-ratio="16/9"
          cover
          src="https://www.pikraken.com/cdn/shop/files/banner.webp?v=1706713711&width=3840"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12" class="mb-2">
        <sub-section-title title="Em destaque"></sub-section-title>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="product in Product.bestSellers().slice(0, 4)"
        :key="product.id"
        cols="6"
        sm="4"
        md="3"
        class="mb-4"
      >
        <product-card
          :product="product"
          @onBuying="appStore.addToCart"
        ></product-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="my-1" dense>
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
