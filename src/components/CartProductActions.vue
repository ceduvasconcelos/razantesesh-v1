<script setup lang="ts">
import { ref } from 'vue'
import formatMoney from '@/utils/formatMoney'
import CartProduct from '@/models/CartProduct'

defineProps({
  product: {
    type: CartProduct,
    required: true
  }
})

const emit = defineEmits(['removeFromCart', 'changeQuantity'])

const loadingRemoveButton = ref(false)

const removeFromCart = (id: number): void => {
  loadingRemoveButton.value = true

  setTimeout(() => {
    emit('removeFromCart', id)

    loadingRemoveButton.value = false
  }, 500)
}
</script>

<template>
  <div class="d-flex flex-no-wrap justify-space-between align-center">
    <div>
      <v-card-title class="text-subtitle-1 font-weight-regular text-md-h6 text-wrap">
        {{ product.title }}
      </v-card-title>

      <v-card-text class="mt-n2 mb-n5">
        <template v-if="product.discount">
          <span class="text-caption text-decoration-line-through">
            {{ formatMoney(product.price) }}
          </span>

          <div class="d-flex align-baseline">
            <span class="text-subtitle-1">
              {{ formatMoney(product.price) }}
            </span>

            <div class="text-caption text-green-darken-1 ms-2">
              {{ product.discount }}% OFF
            </div>
          </div>
        </template>

        <template v-else>
          <span class="text-subtitle-1">
            {{ formatMoney(product.price) }}
          </span>
        </template>

        <template v-if="(product.hasFeatures())">
          <div
            v-for="(feature, index) in product.features"
            :key="index"
            class="text-caption"
          >
            {{ feature }}: {{ product.cart_variant.options[index] }}
          </div>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn
          icon="mdi-minus"
          density="comfortable"
          class="me-2"
          :disabled="product.cart_quantity < 2"
          @click="emit('changeQuantity', product.cart_id, product.cart_quantity - 1)"
        ></v-btn>

        {{ product.cart_quantity }}

        <v-btn
          icon="mdi-plus"
          density="comfortable"
          @click="emit('changeQuantity', product.cart_id, product.cart_quantity + 1)"
        ></v-btn>

        <v-btn
          :loading="loadingRemoveButton"
          :ripple="false"
          icon="mdi-trash-can-outline"
          variant="plain"
          density="comfortable"
          size="small"
          class="ms-4"
          @click="removeFromCart(product.cart_id)"
        ></v-btn>
      </v-card-actions>
    </div>


    <router-link :to="{
      name: 'Product',
      params: { slug: product.slug },
      query: { variant: product.hasFeatures() ? product.cart_variant.id : undefined }
    }">
      <v-avatar
        v-ripple
        class="ma-2 cursor-pointer"
        size="125"
        rounded="lg"
      >
        <v-img :src="'/products/' + product.slug + '-' + product.banner" cover></v-img>
      </v-avatar>
    </router-link>
  </div>
</template>
