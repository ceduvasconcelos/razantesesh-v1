<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/app'
import Product from '@/models/Product'
import Variant from '@/models/Variant'
import formatMoney from '@/utils/formatMoney'
import groupBy from '@/utils/groupBy'
import ProductCarousel from '@/components/ProductCarousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import SubSectionTitle from '@/components/SubSectionTitle.vue'
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
    <v-row class="mb-12">
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
        <v-row dense>
          <v-col cols="12">
            <div class="text-h4 font-weight-medium mb-2">
              {{ product.title }}
            </div>

            <template v-if="selectedVariant.discount">
              <div class="text-caption text-decoration-line-through">
                {{ formatMoney(selectedVariant.priceWithoutDiscount) }}
              </div>

              <div class="d-flex align-baseline ga-2">
                <div class="text-h5">
                  {{ formatMoney(selectedVariant.price) }}
                </div>

                <div class="text-caption text-green ms-2">
                  {{ selectedVariant.discount }}% OFF
                </div>
              </div>
            </template>

            <template v-else>
              <div class="text-h5">
                {{ formatMoney(selectedVariant.price) }}
              </div>
            </template>

            <v-divider class="mt-3 mb-1"></v-divider>
          </v-col>

          <v-col
            v-if="(product.hasFeatures())"
            v-for="(feature, feature_index) in product.features"
            :key="feature_index"
            cols="12"
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
                :border="false"
                variant="outlined"
                :class="{
                  'option-disabled': availableVariant(variants || [], feature_index).requiresChanges,
                  'option-selected': option === selectedVariant.options[feature_index]
                }"
                class="text-overline"
                label
              >
                {{ option }}

                <v-tooltip v-if="availableVariant(variants || [], feature_index).requiresChanges" activator="parent" location="top">
                  Ver opções disponíveis
                </v-tooltip>
              </v-chip>
            </div>
          </v-col>

          <v-col cols="6" sm="4" md="5" lg="4" xl="3" xxl="2">
            <div class="text-overline">
              Quantidade
            </div>

            <v-select
              v-model="selectedQuantity"
              variant="outlined"
              density="compact"
              rounded="lg"
              :suffix="selectedQuantity > 1 ? 'unidades' : 'unidade'"
              :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-3">
            <buy-button
              size="large"
              @on-buying="appStore.addToCart(product.id, selectedVariant.id, selectedQuantity)"
            ></buy-button>

            <v-divider class="mt-6 mb-3"></v-divider>

            <div class="d-flex flex-column mt-3">
              <div class="text-overline text-grey">
                Descrição
              </div>

              {{ product.description }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="mb-2">
        <sub-section-title title="Talvez você goste"></sub-section-title>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="relatedProduct in product.related()"
        :key="relatedProduct.id"
        cols="6"
        sm="4"
        md="3"
      >
        <product-card
          :product="relatedProduct"
          @on-buying="appStore.addToCart(relatedProduct.id, relatedProduct.variants[0].id, selectedQuantity)"
        ></product-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-chip {
  border-style: solid;
  border-width: thin;
  border-color: rgba(0, 0, 0, 0.38);
  transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.v-chip:hover {
  border-color: rgba(0, 0, 0, 1);
}

.option-selected {
  border-width: 2px;
  border-color: rgba(0, 0, 0, 1);
}

.option-disabled {
  border-style: dashed;
}
</style>
