<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { VCard } from 'vuetify/lib/components/index.mjs'
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

const productCardRef = ref<InstanceType<typeof VCard> | null>(null)

const productCardWidth = ref(0)

onUpdated(() => {
  productCardWidth.value = productCardRef.value?.$el.clientWidth
})

onMounted(() => {
  productCardWidth.value = productCardRef.value?.$el.clientWidth
})

const isHovered = ref(false)
</script>

<template>
  <v-card
    ref="productCardRef"
    :to="{ name: 'Product', params: { slug: product.slug } }"
    rounded="lg"
    border
    flat
  >
    <div
      id="yourId"
      class="product-card-thumbnails"
      @touchstart="isHovered = true"
      @touchend="isHovered = false"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <v-img
        :src="'/products/' + product.slug + '-' + product.banner"
        :lazy-src="'/products/' + product.slug + '-' + product.banner"
        :min-height="productCardWidth"
        aspect-ratio="1/1"
        cover
      ></v-img>

      <transition name="product-card-thumbnails-fade">
        <v-img
          v-if="product.overllapingBanner && isHovered"
          :src="'/products/' + product.slug + '-' + product.hover_banner"
          :lazy-src="'/products/' + product.slug + '-' + product.banner"
          :min-height="productCardWidth"
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

.product-card-thumbnails-fade-enter-active,
.product-card-thumbnails-fade-leave-active {
  transition: opacity .25s ease;
}

.product-card-thumbnails-fade-enter-from,
.product-card-thumbnails-fade-leave-to {
  opacity: 0;
}
</style>
