<script setup lang="ts">
import { ref, PropType } from 'vue'
import Product from '@/interfaces/Product'
import CartSummaryModal from '@/components/CartSummaryModal.vue'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const emit = defineEmits(['onBuying'])

const loadingBuyButton = ref(false)

const showModal = ref(false)

const buy = (id: number): void => {
  loadingBuyButton.value = true

  setTimeout(() => {
    emit('onBuying', id)
    loadingBuyButton.value = false
    showModal.value = true
  }, 500)
}
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :to="{ name: 'Product', params: { slug: product.slug } }"
      :elevation="isHovering ? 6 : 1"
      rounded="lg"
      class="mx-auto mb-4"
      v-bind="props"
    >
      <v-img
        :src="product.banner"
        aspect-ratio="1"
        cover
      ></v-img>

      <v-card-title class="text-wrap font-weight-regular">Produto #{{ product.id }}</v-card-title>

      <v-card-text>R$ {{ product.price }},00</v-card-text>

      <v-card-actions class="d-flex flex-column align-start">

        <v-btn
          :loading="loadingBuyButton"
          prepend-icon="mdi-cart-outline"
          variant="outlined"
          text="Comprar"
          rounded="lg"
          class="mb-1"
          block
          @click.prevent="buy(product.id)"
        >
          <template v-slot:loader>
            <v-progress-circular indeterminate size="22" width="1"></v-progress-circular>

            <span class="ms-2 font-weight-light">Incluindo</span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>

  <CartSummaryModal
    v-model="showModal"
    :product="product"
  ></CartSummaryModal>
</template>
