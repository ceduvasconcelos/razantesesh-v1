<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useAppStore } from '@/store/app'
import Product from '@/models/Product'
import ProductCard from '@/components/ProductCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'

const appStore = useAppStore()

const products: Ref<Product[]> = ref(Product.all())

const sortingOptions = ref([
  { label: 'Mais recentes', type: 'most_recent' },
  { label: 'Mais vendidos', type: 'best_sellers' },
  { label: 'Menor preço', type: 'lowest_price' },
  { label: 'Maior preço', type: 'biggest_price' }
])

const sortingInput = ref(sortingOptions.value[0])

const sort = (type: any) => {
  products.value = Product.orderBy(type)
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <section-title title="Produtos"></section-title>
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          label="Ordenar por:"
          :active="false"
          v-model="sortingInput"
          :items="sortingOptions"
          item-title="label"
          item-value="type"
          variant="outlined"
          density="compact"
          rounded="lg"
          hide-details
          flat
          class="mt-n2 mb-4"
          @update:modelValue="sort"
        ></v-select>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="6"
        sm="4"
        md="3"
      >
        <product-card
          :product="product"
          @onBuying="appStore.addToCart"
        ></product-card>
      </v-col>
    </v-row>
  </v-container>
</template>
