<script setup lang="ts">
import { ref, Ref } from 'vue'
import Product from '@/models/Product'
import SubSectionTitle from '@/components/SubSectionTitle.vue'
import ProductCard from '@/components/ProductCard.vue'
import { Splide, SplideSlide, Options } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/core'

defineEmits(['onBuying'])

const splideRef = ref()

const splideOptions: Ref<Options> = ref({
  perPage: 5,
  pagination: false,
  drag: false,
  gap: 8,
  breakpoints: {
    960: {
      perPage: 3,
    },
    600: {
      perPage: 2,
    },
  }
})

const scroll = (direction: '+1' | '-1') => {
  splideRef.value.go(direction)
}

const activePrevButton: Ref<boolean> = ref(true)
const activeNextButton: Ref<boolean> = ref(true)

const onArrowsUpdated = (_: any, prev: HTMLButtonElement, next: HTMLButtonElement) => {
  activePrevButton.value = prev.hasAttribute('disabled')

  activeNextButton.value = next.hasAttribute('disabled')
}
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="mt-12">
        <sub-section-title title="Confira também">
          <template #append>
            <v-btn
              icon="mdi-chevron-left"
              variant="plain"
              class="mx-2"
              density="comfortable"
              :disabled="activePrevButton"
              @click="scroll('-1')"
            ></v-btn>

            <v-btn
              icon="mdi-chevron-right"
              variant="plain"
              density="comfortable"
              :disabled="activeNextButton"
              @click="scroll('+1')"
            ></v-btn>
          </template>
        </sub-section-title>
      </v-col>

      <v-col cols="12">
        <splide :options="splideOptions" ref="splideRef" @splide:arrows:updated="onArrowsUpdated">
          <splide-slide v-for="product in Product.all()" :key="product.id">
            <product-card :product="product" @on-buying="product => $emit('onBuying', product.id, product.variants[0].id)"></product-card>
          </splide-slide>
        </splide>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
:deep(.splide__track) {
  padding: 1px !important;
}

:deep(.splide__arrows) {
  display: none;
}
</style>
