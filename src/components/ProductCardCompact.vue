<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { VCard } from 'vuetify/lib/components/index.mjs'
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
    flat
  >
    <div class="position-relative" style="color: rgba(0, 0, 0, 0.3);">
      <v-img
        v-ripple
        :src="'/products/' + product.slug + '-' + product.banner"
        :min-height="productCardWidth"
        class="foda"
        rounded="lg"
        cover
      ></v-img>

      <v-img
        v-if="product.has_overlap_banner"
        v-ripple
        :src="'/products/' + product.slug + '-' + product.overlap_banner"
        :min-height="productCardWidth"
        rounded="lg"
        cover
      ></v-img>

      <v-badge
        v-if="product.discount"
        color="green"
        :content="product.discount + '% OFF'"
        class="mb-2 ms-1"
        inline
      ></v-badge>
    </div>

    <v-card-text class="text-subtitle-1 text-black pa-2">
      {{ product.title }}

      <div class="mt-1">
        <span v-if="product.discount" class="text-decoration-line-through text-caption me-2">
          {{ formatMoney(product.priceWithoutDiscount) }}
        </span>

        {{ formatMoney(product.price) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card {
  color: transparent;
}

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

  .v-card:hover .v-img:not(:first-child) {
    opacity: 1;
  }
}

.v-badge {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
