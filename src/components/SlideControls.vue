<script setup lang="ts">
import { useSwiper } from 'swiper/vue'

const swiper = useSwiper()
</script>

<template>
  <div class="slide-controls d-flex justify-space-between">
    <v-btn
      class="slide-control-prev"
      icon="mdi-chevron-left"
      density="comfortable"
      variant="text"
      @click="swiper.slidePrev()"
      :disabled="swiper.isBeginning"
    ></v-btn>

    <v-btn
      class="slide-control-next"
      icon="mdi-chevron-right"
      density="comfortable"
      variant="text"
      @click="swiper.slideNext()"
      :disabled="swiper.isEnd"
    ></v-btn>
  </div>
</template>

<style scoped>
@media screen and (max-width: 600px) {
  .slide-controls {
    display: none !important;
  }
}
</style>
