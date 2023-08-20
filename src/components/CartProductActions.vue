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
  <div class="d-flex flex-no-wrap align-center justify-space-between">
    <div>
      <v-card-title class="text-wrap">
        {{ product.title }}
      </v-card-title>

      <v-card-subtitle>R$ {{ product.price }},00</v-card-subtitle>

      <v-card-actions>
        <v-btn
          icon="mdi-minus"
          :disabled="cartStore.productQuantity(product.id) < 2"
          @click="emit('changeQuantity', product.id, cartStore.productQuantity(product.id) - 1)"
        ></v-btn>
        <span>{{ cartStore.productQuantity(product.id) }}</span>
        <v-btn
          icon="mdi-plus"
          class="m-0"
          @click="emit('changeQuantity', product.id, cartStore.productQuantity(product.id) + 1)"
        ></v-btn>

        <v-btn
          :loading="loadingRemoveButton"
          variant="plain"
          icon="mdi-close-circle"
          class="m-0"
          size="small"
          @click="removeFromCart(product.id)"
        ></v-btn>
      </v-card-actions>
    </div>

    <v-avatar
      class="ma-3"
      size="125"
      rounded="lg"
    >
      <v-img :src="product.banner"></v-img>
    </v-avatar>
  </div>
</template>
