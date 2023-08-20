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
      :elevation="isHovering ? 4 : 1"
      rounded="lg"
      class="mx-auto mb-4"
      v-bind="props"
    >
      <v-img
        :src="product.banner"
        :lazy-src="product.banner"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        cover
      >
        <v-card-title class="text-white">Produto #{{ product.id }}</v-card-title>
      </v-img>

      <v-card-text class="d-flex flex-column">
        <div>
          <span class="text-h6 text-md-h6">R$ {{ product.price }},00</span>
          <span class="text-green font-weight-medium ms-2">58% OFF</span>
        </div>

        <span class="text-decoration-line-through text-medium-emphasis">R$ {{ product.price + 15 }},00</span>
      </v-card-text>

      <v-card-actions>
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
