<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/app'
import Product from '@/models/Product'
import Variant from '@/models/Variant'
import formatMoney from '@/utils/formatMoney'
import groupBy from '@/utils/groupBy'
import ProductCarousel from '@/components/ProductCarousel.vue'
import ProductsSlide from '@/components/ProductsSlide.vue'
import BuyButton from '@/components/BuyButton.vue'

const props = defineProps({
  product: {
    type: Product,
    required: true,
  },
  selectedVariant: {
    type: Variant,
    required: true,
  }
})

const appStore = useAppStore()

const selectedQuantity = ref(1)

const availableVariant = (variants: any[], feature_index: number) => {
  let availableVariant = variants.find(
    variant => JSON.stringify(variant.options.filter((option: string, index: number) => index !== feature_index))
      === JSON.stringify(props.selectedVariant.options.filter((option: string, index: number) => index !== feature_index))
  )

  let requiresChanges = false

  if (! availableVariant) {
    availableVariant = variants[0]

    requiresChanges = true
  }

  return {
    availableVariant,
    requiresChanges
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs class="pa-0">
          <v-breadcrumbs-item :to="{ name: 'Products' }">Produtos</v-breadcrumbs-item>

          <v-breadcrumbs-divider></v-breadcrumbs-divider>

          <v-breadcrumbs-item disabled>{{ product.title }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>

      <v-col cols="12" md="6">
        <product-carousel :product="product"></product-carousel>
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-h4 font-weight-black mb-2">
          {{ product.title }}
        </div>

        <template v-if="selectedVariant.discount">
          <div class="text-caption text-decoration-line-through">{{ formatMoney(selectedVariant.priceWithoutDiscount) }}</div>

          <div class="d-flex align-baseline ga-2">
            <div class="text-h5">
              {{ formatMoney(selectedVariant.price) }}
            </div>

            <div class="text-caption text-green-darken-1">
              {{ selectedVariant.discount }}% OFF
            </div>
          </div>
        </template>

        <template v-else>
          <div class="text-h5">{{ formatMoney(selectedVariant.price) }}</div>
        </template>

        <template v-if="(product.hasFeatures())">
          <v-divider class="my-3"></v-divider>

          <div class="d-flex flex-column ga-4">
            <div
              v-for="(feature, feature_index) in product.features"
              :key="feature_index"
              class="d-flex flex-column"
            >
              <div class="text-overline">
                {{ feature }}: {{ selectedVariant.options[feature_index] }}
              </div>

              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="(variants, option) in groupBy(product.variants, (variant: any) => variant.options[feature_index])"
                  :key="option"
                  :to="{
                    name: 'Product',
                    params: {
                      slug: product.slug
                    },
                    query: {
                      variant: availableVariant(variants || [], feature_index).availableVariant.id
                    }
                  }"
                  :variant="option === selectedVariant.options[feature_index] ? 'flat' : 'outlined'"
                  :class="{ 'option-disabled': availableVariant(variants || [], feature_index).requiresChanges }"
                  class="text-overline"
                  label
                >
                  {{ option }}

                  <v-tooltip v-if="availableVariant(variants || [], feature_index).requiresChanges" activator="parent" location="top">
                    Ver opções disponíveis
                  </v-tooltip>
                </v-chip>
              </div>
            </div>
          </div>
        </template>

        <v-divider class="my-6"></v-divider>

        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedQuantity"
              label="Quantidade"
              variant="outlined"
              density="compact"
              rounded="lg"
              :suffix="selectedQuantity > 1 ? 'unidades' : 'unidade'"
              :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" md="8">
            <buy-button
              size="large"
              @on-buying="appStore.addToCart(product.id, selectedVariant.id, selectedQuantity)"
            ></buy-button>
          </v-col>
        </v-row>

        <div class="d-flex flex-column mt-6">
          <div class="text-overline text-grey">
            Descrição
          </div>

          <div>{{ product.description }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <products-slide @on-buying="appStore.addToCart"></products-slide>
</template>

<style scoped>
.option-disabled {
  border-style: dashed !important;
}

:deep(.swiper-slide) {
  display: inline !important;
  box-sizing: border-box !important;
}
</style>
