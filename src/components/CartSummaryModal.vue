<script setup lang="ts">
import { PropType } from 'vue'
import Product from '@/interfaces/Product'

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
</script>

<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    temporary
    location="right"
    class="pa-4"
  >
    <template #prepend>
      <p class="font-weight-medium text-left mb-4">
        <v-icon icon="mdi-check-circle" color="green-darken-2" size="sm" class="mb-1"></v-icon>
        Adicionado ao carrinho
      </p>
    </template>

    <div class="d-flex">
      <v-avatar rounded="lg">
        <v-img
          class="rounded-lg"
          :src="product.banner"
        ></v-img>
      </v-avatar>

      <div class="ms-4">
        <p class="text-left text-caption">{{ product.title }}</p>
        <p class="text-left text-caption">{{ quantity }}x <span class="font-weight-medium">R$ {{ product.price }},00</span></p>
      </div>
    </div>

    <template #append>
      <div class="d-flex justify-space-between mb-2">
        <span class="font-weight-medium">Total</span>
        <span class="font-weight-medium">R$ {{ product.price * quantity }},00</span>
      </div>

      <v-divider></v-divider>

      <v-btn
        variant="text"
        rounded="lg"
        text="Continuar comprando"
        block
        class="my-4"
        @click="$emit('update:modelValue', false)"
      ></v-btn>

      <v-btn
        variant="outlined"
        rounded="lg"
        prepend-icon="mdi-shopping"
        text="Ver carrinho"
        block
        :active="false"
        :to="{ name: 'Cart' }"
      ></v-btn>
    </template>
  </v-navigation-drawer>
</template>
