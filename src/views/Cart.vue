<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import CartSummary from '@/components/CartSummary.vue'
import CartProductActions from '@/components/CartProductActions.vue'

const cartStore = useCartStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" order-md="12">
        <CartSummary :quantity="cartStore.quantity" :total="cartStore.total" />
      </v-col>

      <v-col
        v-if="cartStore.quantity"
        cols="12"
        md="8"
      >
        <v-card rounded="lg">
          <template
            v-for="(product, index) in cartStore.products"
            :key="product.id"
          >
            <v-divider v-if="index"></v-divider>

            <CartProductActions
              :product="product"
              @changeQuantity="cartStore.updateQuantity"
              @removeFromCart="cartStore.remove"
            />
          </template>
        </v-card>
      </v-col>

      <v-col v-else cols="12" md="8">
        <v-sheet
          elevation="1"
          rounded="lg"
          class="d-flex flex-column align-center justify-center flex-wrap text-center mx-auto py-16 px-2"
        >
          <p class="font-weight-medium">Seu carrinho está vazio.</p>
          <p class="font-weight-light text-caption">Adicione produtos para continuar suas compras!</p>
          <v-btn
            class="mt-4"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-shopping"
            :active="false"
            :to="{ name: 'Home' }"
          >
            Conferir produtos
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
