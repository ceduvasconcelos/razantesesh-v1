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
</script>

<template>
  <v-card
    ref="productCardRef"
    :to="{ name: 'Product', params: { slug: product.slug } }"
    rounded="lg"
    border
    flat
  >
    <div class="position-relative">
      <v-img
        :src="'/products/' + product.slug + '-' + product.banner"
        :min-height="productCardWidth"
        cover
      ></v-img>

      <v-img
        :src="'/products/' + product.slug + '-' + product.overlap_banner"
        :min-height="productCardWidth"
        cover
      ></v-img>
    </div>

    <v-card-title class="text-body-2 mt-n1">
      {{ product.title }}
    </v-card-title>

    <v-card-text class="d-flex flex-column mt-n4">
      <span class="text-body-2 text-decoration-line-through mt-1" style="height: 1rem;">
        {{ product.discount ? formatMoney(product.priceWithoutDiscount) : '' }}
      </span>

      <div class="d-flex justify-space-between align-baseline">
        <span class="text-subtitle-1">
          {{ formatMoney(product.price) }}
        </span>

        <span v-if="product.discount" class="text-body-2 text-green">
          {{ product.discount }}% OFF
        </span>
      </div>
    </v-card-text>

    <v-card-actions class="mt-n4">
      <buy-button @on-buying="$emit('on-buying', product.id, product.variants[0].id)"></buy-button>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-img:not(:first-child) {
  display: none;
}

@media (min-width: 1280px) {
  .v-img:not(:first-child) {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    transition: opacity .25s ease;
  }

  .v-img:hover {
    opacity: 1;
  }
}
</style>
