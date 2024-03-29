<script setup lang="ts">
import { ref } from 'vue'
import Product from '@/models/Product'
import SubSectionTitle from '@/components/SubSectionTitle.vue'
import ProductCard from '@/components/ProductCard.vue'
import SlideControls from '@/components/SlideControls.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

defineEmits(['onBuying'])

const modules = ref([
  Navigation,
  Scrollbar
])
</script>

<template>
  <swiper
    :modules="modules"
    :allow-touch-move="false"
    :slides-per-view="2"
    :space-between="8"
    :scrollbar="{
      draggable: true,
    }"
    :breakpoints="{
      '0': {
        allowTouchMove: true,
        scrollbar: {
          hide: false
        }
      },
      '600': {
        slidesPerView: 3,
      },
      '960': {
        slidesPerView: 4,
      },
      '1024': {
        slidesPerView: 5,
      }
    }"
    style="padding: 1px 1px 1rem 1px;"
  >
    <template v-slot:container-start>
      <sub-section-title title="Confira também">
        <template v-slot:append>
          <v-btn
            :to="{ name: 'Products' }"
            variant="plain"
            rounded="lg"
          >
            Ver todos
          </v-btn>

          <slide-controls></slide-controls>
        </template>
      </sub-section-title>
    </template>

    <swiper-slide
      v-for="product in Product.all()"
      :key="product.id"
      class="mt-4"
    >
      <product-card
        :product="product"
        @on-buying="product => $emit('onBuying', product.id, product.variants[0].id)"
      ></product-card>
    </swiper-slide>
  </swiper>
</template>
