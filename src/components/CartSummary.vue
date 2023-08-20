<script setup lang="ts">
import { ref } from 'vue';

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

const emit = defineEmits(['onConfirm'])

const loadingConfirmButton = ref(false)

const confirm = (): void => {
  loadingConfirmButton.value = true

  setTimeout(() => {
    emit('onConfirm')
    loadingConfirmButton.value = false
  }, 500)
}
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
          <span>Total ({{ quantity }} {{ quantity > 1 ? 'produtos' : 'produto' }})</span>

          <span class="font-weight-medium">R$ {{ total }},00</span>
        </div>
      </div>

      <div class="pa-4">
        <v-btn
          :loading="loadingConfirmButton"
          variant="outlined"
          rounded="lg"
          :active="false"
          block
          @click="confirm"
        >
          Continuar a compra

          <template v-slot:loader>
            <v-progress-circular indeterminate size="22" width="1"></v-progress-circular>

            <span class="ms-2 font-weight-light">Redirecionando</span>
          </template>
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
