<script setup lang="ts">
import { PropType } from 'vue';
import { useCartStore } from '@/store/cart'
import Product from '@/interfaces/Product';
import { VBottomSheet } from 'vuetify/lib/labs/components.mjs'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object as PropType<Product>,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
})

defineEmits(['update:modelValue'])

const cartStore = useCartStore()
</script>

<template>
  <v-bottom-sheet
    :model-value="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    inset
  >
    <v-card
      class="text-center pa-4"
      height="220"
      rounded="lg"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <p class="font-weight-medium text-left">
            <v-icon icon="mdi-check-circle" color="green" size="sm" class="mb-1"></v-icon>
            Adicionado ao carrinho
          </p>

          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-start align-center">
            <v-avatar
              size="40"
            >
              <v-img :src="product.banner"></v-img>
            </v-avatar>

            <div class="ms-4">
              <p class="text-left text-caption">{{ product.title }}</p>
              <p class="text-left text-caption">{{ quantity }}x <span class="font-weight-medium">R$ {{ product.price }},00</span></p>
            </div>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="d-flex justify-space-between">
            <span>Subtotal ({{ cartStore.totalQuantity }} {{ cartStore.totalQuantity > 1 ? 'produtos' : 'produto' }})</span>

            <span class="font-weight-medium">R$ {{ cartStore.total }},00</span>
          </div>
        </v-col>

        <v-col cols="12">
          <v-btn :to="{ name: 'Cart' }" variant="outlined" rounded="lg" block>
            Ver carrinho
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-bottom-sheet>
</template>
