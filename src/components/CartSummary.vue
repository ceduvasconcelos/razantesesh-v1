<script setup lang="ts">
defineProps({
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <v-sheet elevation="1" rounded="lg">
    <template v-if="quantity">
      <div class="pa-4 font-weight-medium">
        Resumo da compra
      </div>

      <v-divider></v-divider>

      <div class="pa-4">
        <div class="d-flex justify-space-between">
          <span>Subtotal ({{ quantity }} {{ quantity > 1 ? 'produtos' : 'produto' }})</span>

          <span class="font-weight-medium">R$ {{ total }},00</span>
        </div>
      </div>

      <div class="pa-4">
        <v-btn
          variant="outlined"
          rounded="lg"
          :active="false"
          block
        >
          Continuar a compra
        </v-btn>
      </div>
    </template>

    <template v-else>
      <div class="pa-4 font-weight-medium">
        Resumo da compra
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-caption font-weight-light">
        <div class="d-flex justify-space-between">
          Aqui, você encontrará os valores da sua compra assim que adicionar produtos.
        </div>
      </div>
    </template>
  </v-sheet>
</template>
