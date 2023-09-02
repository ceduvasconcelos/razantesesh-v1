<script setup lang="ts">
import { PropType } from 'vue'
import Product from '@/interfaces/Product'
import BuyButton from './BuyButton.vue'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

defineEmits(['on-buying'])
</script>

<template>
  <v-card
    :to="{ name: 'Product', params: { slug: product.slug } }"
    rounded="lg"
  >
    <v-img
      :src="product.banner"
      :lazy-src="product.banner"
      min-height="180"
      aspect-ratio="4/3"
      cover
    ></v-img>

    <v-card-title class="text-subtitle-1 font-weight-regular text-md-h6">{{ product.title }}</v-card-title>

    <v-card-text class="d-flex flex-column text-no-wrap mt-n2">
      <span class="text-caption text-decoration-line-through" style="height: 1rem;">{{ product.id < 4 ? `R$ ${product.price + 15},00` : '' }}</span>

      <div class="d-flex align-baseline">
        <span class="text-subtitle-1">R$ {{ product.price }},00</span>


        <div v-if="product.id < 4" class="text-green-darken-1 font-weight-medium ms-auto">
          <v-icon icon="mdi-arrow-down" size="x-small"></v-icon>

          {{ Math.floor((((product.price + 15) - product.price) / (product.price + 15)) * 100) }}%
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="mb-1 mt-n3">
      <buy-button @on-buying="$emit('on-buying', product.id)"></buy-button>
    </v-card-actions>
  </v-card>
</template>
