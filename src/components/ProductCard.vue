<script setup lang="ts">
import { ref } from 'vue'
import BuyButton from '@/components/BuyButton.vue'
import formatMoney from '@/utils/formatMoney'
import Product from '@/models/Product'

defineProps({
  product: {
    type: Product,
    required: true
  }
})

defineEmits(['on-buying'])

const isHovered = ref(false)
</script>

<template>
  <v-card
    :to="{ name: 'Product', params: { slug: product.slug } }"
    rounded="lg"
    border
    flat
  >
    <div
      class="product-card-thumbnails"
      @touchstart = "isHovered = true"
      @touchend = "isHovered = false"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <v-img
        :src="'/products/' + product.slug + '-' + product.banner"
        min-height="180"
        aspect-ratio="1/1"
        cover
      ></v-img>

      <transition name="fade">
        <v-img
          v-if="product.overllapingBanner && isHovered"
          :src="'/products/' + product.slug + '-' + product.hover_banner"
          min-height="180"
          aspect-ratio="1/1"
          cover
        ></v-img>
      </transition>
    </div>

    <v-card-title class="text-subtitle-2 font-weight-medium">
      {{ product.title }}
    </v-card-title>

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
.product-card-thumbnails :not(:first-child) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
