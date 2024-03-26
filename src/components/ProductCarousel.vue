<script setup lang="ts">
import { ref } from 'vue'
import Product from '@/models/Product'

defineProps({
  product: {
    type: Product,
    required: true
  }
})

const selectedImageIndex = ref(0)
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <v-carousel
        v-model="selectedImageIndex"
        :show-arrows="false"
        hide-delimiter-background
        touch
        color="white"
        class="rounded-lg"
      >
        <v-carousel-item
          v-for="(image, index) in product.images"
          :key="index"
          :src="'/products/' + product.slug + '-' + image"
          aspect-ratio="1/1"
          cover
        ></v-carousel-item>
      </v-carousel>
    </v-col>

    <v-col cols="12">
      <v-item-group v-model="selectedImageIndex" class="d-none d-md-block mt-4" mandatory>
        <v-row justify="center" dense>
          <v-col
            v-for="(image, index) in product.images"
            :key="index"
            cols="2"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                flat
                rounded="lg"
                @click="toggle"
              >
                <v-img
                  :gradient="isSelected ? '' : 'to bottom, rgba(248,248,255,.4), rgba(248,248,255,.4)'"
                  aspect-ratio="1"
                  cover
                  :src="'/products/' + product.slug + '-' + image"
                ></v-img>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-col>
  </v-row>
</template>
