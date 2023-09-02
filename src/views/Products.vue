<script setup lang="ts">
import { ref, Ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { useCartStore } from '@/store/cart'
import ProductCard from '@/components/ProductCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'

const appStore = useAppStore()
const cartStore = useCartStore()

const products = ref(appStore.products)

const sortFilters = ref([
  { label: 'Mais recentes' },
  { label: 'Mais vendidos', column: 'best_sellers' },
  { label: 'Menor preço', column: 'lowest_price' },
  { label: 'Maior preço', column: 'biggest_price' }
])

const sort = ref(sortFilters.value[0])

watch(
  () => sort.value,
  (value) => {
    // @ts-ignore
    products.value = appStore.orderBy(value)
  }
)
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs class="pa-0">
          <v-breadcrumbs-item :to="{ name: 'Home' }">Início</v-breadcrumbs-item>
          <v-breadcrumbs-divider></v-breadcrumbs-divider>
          <v-breadcrumbs-item disabled>Produtos</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>

      <v-col cols="12">
        <SectionTitle title="Produtos" />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          label="Ordenar por:"
          :active="false"
          v-model="sort"
          :items="sortFilters"
          item-title="label"
          item-value="column"
          variant="solo-filled"
          density="compact"
          rounded="lg"
          hide-details
          flat
          class="mt-n2 mb-4"
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-1" dense>
      <v-col
        v-for="product in appStore.products"
        :key="product.id"
        cols="6"
        sm="4"
        md="3"
        class="mb-4"
      >
        <product-card
          :product="product"
          @onBuying="cartStore.add"
        ></product-card>
      </v-col>
    </v-row>
  </v-container>
</template>
