<script setup lang="ts">
import { ref } from 'vue'
//import { useCartStore } from '@/store/cart'
import { useAppStore } from '@/store/app'
//import CartSummaryModal from '@/components/CartSummaryModal.vue'
import ProductCarousel from '@/components/ProductCarousel.vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const appStore = useAppStore()

//const cartStore = useCartStore()

const product = appStore.findBySlug(props.slug)

const quantity = ref(1)

const loadingBuyButton = ref(false)

const showModal = ref(false)

const buy = (id: number): void => {
  loadingBuyButton.value = true

  setTimeout(() => {
    //cartStore.add(id, quantity.value)
    loadingBuyButton.value = false
    showModal.value = true
  }, 500)
}
</script>

<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs class="pa-0">
          <v-breadcrumbs-item :to="{ name: 'Home' }">Produtos</v-breadcrumbs-item>
          <v-breadcrumbs-divider></v-breadcrumbs-divider>
          <v-breadcrumbs-item disabled>{{ product.title }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>

      <v-col cols="12" md="6">
        <ProductCarousel :images="product.images" />
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-black">{{ product.title }}</h1>
        <h5 class="text-h5 mt-2">R$ {{ product.price }},00</h5>

        <v-divider class="my-6"></v-divider>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="quantity"
              label="Quantidade"
              :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              variant="outlined"
              density="compact"
              :suffix="quantity > 1 ? 'unidades' : 'unidade'"
              hide-details
              rounded="lg"
            ></v-select>
          </v-col>

          <v-col cols="12" md="8">
            <v-btn
              :loading="loadingBuyButton"
              prepend-icon="mdi-cart-outline"
              variant="outlined"
              size="large"
              rounded="lg"
              block
              @click="buy(product.id)"
            >
              Comprar
              <template v-slot:loader>
                <v-progress-circular indeterminate size="22" width="1"></v-progress-circular>

                <span class="ms-2 font-weight-light">Incluindo</span>
              </template>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

        <div class="f-flex flex-column">
          <h5 class="text-subtitle-2 text-grey mb-2">DESCRIÇÃO</h5>
          <p class="">{{ product.description }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>

<!--
  <CartSummaryModal
    v-if="product"
    v-model="showModal"
    :product="product"
    :quantity="quantity"
  ></CartSummaryModal> -->
</template>
