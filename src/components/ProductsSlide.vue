<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useAppStore } from '@/store/app'
import SectionTitle from '@/components/SectionTitle.vue'
import ProductCard from '@/components/ProductCard.vue'
import { Splide, SplideSlide, Options } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/core'

defineEmits(['onBuying'])

const appStore = useAppStore()

const splideComponent = ref()

const splideOptions: Ref<Options> = ref({
  perPage: 5,
  pagination: false,
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
  splideComponent.value.go(direction)
}

const activePrevButton: Ref<Boolean> = ref(true)
const activeNextButton: Ref<Boolean> = ref(true)

const onArrowsUpdated = (_: any, prev: HTMLButtonElement, next: HTMLButtonElement) => {
  activePrevButton.value = prev.hasAttribute('disabled')

  activeNextButton.value = next.hasAttribute('disabled')
}
</script>

<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="mt-12">
        <section-title title="Confira também">
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
        </section-title>
      </v-col>

      <v-col cols="12">
        <splide :options="splideOptions" ref="splideComponent" @splide:arrows:updated="onArrowsUpdated">
          <splide-slide v-for="product in appStore.products" :key="product.id">
            <product-card :product="product" @on-buying="product => $emit('onBuying', product)"></product-card>
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
