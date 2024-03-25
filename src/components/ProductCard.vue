<script setup lang="ts">
import { PropType } from 'vue'
import BuyButton from '@/components/BuyButton.vue'
import formatMoney from '@/utils/formatMoney'
import Product from '@/models/Product'

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
      :src="`/src/assets/products/${product.slug}-${product.banner}`"
      :lazy-src="`/src/assets/products/${product.slug}-${product.banner}`"
      min-height="180"
      aspect-ratio="1/1"
      cover
    ></v-img>

    <v-img
      v-if="product.overllapingBanner"
      :src="`/src/assets/products/${product.slug}-${product.hover_banner}`"
      :lazy-src="`/src/assets/products/${product.slug}-${product.hover_banner}`"
      class="overlapping-banner"
      min-height="180"
      aspect-ratio="1/1"
      cover
    ></v-img>

    <v-card-title class="text-subtitle-2 font-weight-medium">{{ product.title }}</v-card-title>

    <v-card-text class="d-flex flex-column text-no-wrap mt-n3">
      <span class="text-caption text-decoration-line-through" style="height: 1rem;">
        {{ product.discount ? formatMoney(product.priceWithoutDiscount) : '' }}
      </span>

      <div class="d-flex align-baseline">
        <span class="text-subtitle-1 font-weight-medium">{{ formatMoney(product.price) }}</span>

        <div v-if="product.discount" class="text-caption text-green-darken-1 ms-auto">
          {{ product.discount }}% OFF
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="mt-n4">
      <buy-button @on-buying="$emit('on-buying', product.id, product.variants[0].id)"></buy-button>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.overlapping-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity .25s ease;
}

.overlapping-banner:hover {
  opacity: 1;
}
</style>
