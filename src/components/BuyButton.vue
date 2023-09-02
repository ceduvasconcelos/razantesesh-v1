<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['on-buying'])

const loadingBuyButton = ref(false)

const buy = (): void => {
  loadingBuyButton.value = true

  setTimeout(() => {
    emit('on-buying')
    loadingBuyButton.value = false
  }, 500)
}
</script>

<template>
  <v-btn
    :loading="loadingBuyButton"
    prepend-icon="mdi-cart-outline"
    variant="outlined"
    text="Comprar"
    rounded="lg"
    block
    @click.prevent="buy"
  >
    <template #loader>
      <v-progress-circular indeterminate size="22" width="1"></v-progress-circular>

      <span class="ms-2 font-weight-light">Incluindo</span>
    </template>
  </v-btn>
</template>
