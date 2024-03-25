<script setup lang="ts">
import { useAppStore } from '@/store/app'
import CartSummary from '@/components/CartSummary.vue'
import CartProductActions from '@/components/CartProductActions.vue'

const appStore = useAppStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" order-md="12">
        <cart-summary
          :quantity="appStore.cartQuantity"
          :total="appStore.cartPrice"
          @onConfirm="appStore.confirmPurchase"
        ></cart-summary>
      </v-col>

      <v-col v-if="appStore.cartQuantity" cols="12" md="8">
        <v-card rounded="lg">
          <template v-for="(product, index) in appStore.cartProducts" :key="product.id">
            <v-divider v-if="index"></v-divider>

            <cart-product-actions
              :product="product"
              @changeQuantity="appStore.updateCartQuantity"
              @removeFromCart="appStore.removeFromCart"
            ></cart-product-actions>
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
            :to="{ name: 'Products' }"
          >
            Conferir produtos
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
