<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useAppStore } from '@/store/app'
import SectionTitle from '@/components/SectionTitle.vue'
import ProductCard from '@/components/ProductCard.vue'

defineEmits(['onBuying'])

const appStore = useAppStore()

// @ts-ignore
const slide: Ref<HTMLOListElement> = ref(null)

const scroll = (location: 'next' | 'prev'): void => {
  let offset = 188

  if (location === 'prev') {
    offset = -offset
  }

  slide.value.scrollBy({
    left: offset,
    behavior: 'smooth'
  })
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
              class="mx-2 d-none d-md-flex"
              density="compact"
              @click="scroll('prev')"
            ></v-btn>

            <v-btn
              icon="mdi-chevron-right"
              variant="plain"
              class="d-none d-md-flex"
              density="compact"
              @click="scroll('next')"
            ></v-btn>
          </template>
        </section-title>
      </v-col>

      <v-col cols="12">
        <ol class="v-slide-group-container__custom pa-1" ref="slide">
          <li v-for="product in appStore.products" :key="product.id" class="v-slide-group-item__custom">
            <product-card :product="product" @on-buying="product => $emit('onBuying', product)"></product-card>
          </li>
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-slide-group-container__custom {
  overflow: visible;
  overflow-x: auto;
  flex-wrap: unset;
  white-space: nowrap;
  display: flex;
  gap: 8px;
}

.v-slide-group-container__custom::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.v-slide-group-container__custom {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.v-slide-group-item__custom {
  min-width: 180px;
}
</style>
