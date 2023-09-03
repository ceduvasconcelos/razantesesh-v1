<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/store/cart'
import { useAppStore } from '@/store/app'
import ProductCarousel from '@/components/ProductCarousel.vue'
import ProductsSlide from '@/components/ProductsSlide.vue'
import BuyButton from '@/components/BuyButton.vue'
import PurchaseModal from '@/components/PurchaseModal.vue'
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slug != from.params.slug) {
    product.value = appStore.findBySlug(to.params.slug.toString())
  }
})

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const appStore = useAppStore()
const cartStore = useCartStore()

const product = ref(appStore.findBySlug(props.slug))
const quantity = ref(1)
</script>

<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs class="pa-0">
          <v-breadcrumbs-item :to="{ name: 'Home' }">Início</v-breadcrumbs-item>

          <v-breadcrumbs-divider></v-breadcrumbs-divider>

          <v-breadcrumbs-item disabled>{{ product.title }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>

      <v-col cols="12" md="6">
        <product-carousel :images="product.images"></product-carousel>
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
              rounded="lg"
              :suffix="quantity > 1 ? 'unidades' : 'unidade'"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" md="8">
            <buy-button size="large" @on-buying="cartStore.add(product.id, quantity)"></buy-button>
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

  <products-slide @on-buying="cartStore.add"></products-slide>

  <purchase-modal v-model="showPurchaseModal"></purchase-modal>
</template>
