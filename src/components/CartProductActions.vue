<script setup lang="ts">
import { ref, PropType } from 'vue'
import { useCartStore } from '@/store/cart'
import Product from '@/interfaces/Product'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const emit = defineEmits(['removeFromCart', 'changeQuantity'])

const cartStore = useCartStore()

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
      <v-card-title class="text-subtitle-1 font-weight-regular text-md-h6 text-wrap">{{ product.title }}</v-card-title>

      <v-card-text class="text-subtitle-1">R$ {{ product.price }},00</v-card-text>

      <v-card-actions>
        <v-btn
          icon="mdi-minus"
          density="comfortable"
          class="me-2"
          :disabled="cartStore.productQuantity(product.id) < 2"
          @click="emit('changeQuantity', product.id, cartStore.productQuantity(product.id) - 1)"
        ></v-btn>

        {{ cartStore.productQuantity(product.id) }}

        <v-btn
          icon="mdi-plus"
          density="comfortable"
          @click="emit('changeQuantity', product.id, cartStore.productQuantity(product.id) + 1)"
        ></v-btn>

        <v-btn
          :loading="loadingRemoveButton"
          variant="plain"
          icon="mdi-close-circle"
          size="small"
          class="ms-4"
          @click="removeFromCart(product.id)"
        ></v-btn>
      </v-card-actions>
    </div>

    <v-avatar
      class="ma-2"
      size="125"
      rounded="lg"
    >
      <v-img :src="product.banner"></v-img>
    </v-avatar>
  </div>
</template>
