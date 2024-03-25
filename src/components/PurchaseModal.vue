<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:model-value'])
</script>

<template>
  <v-bottom-sheet
    inset
    :model-value="modelValue"
    @update:model-value="value => $emit('update:model-value', value)"
  >
    <v-card class="py-4 px-6" rounded="lg">
      <v-row>
        <v-col cols="12">
          <div class="d-flex flex-column justify-center align-center mb-4">
            <v-icon icon="mdi-checkbox-marked-circle-outline" size="x-large" color="green-darken-2"></v-icon>

            <p class="font-weight-medium mt-1">Adicionado ao carrinho</p>
          </div>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" md="6">
          <v-btn variant="tonal" rounded="lg" block @click="$emit('update:model-value', false)">
            Continuar comprando
          </v-btn>
        </v-col>

        <v-col cols="12" md="6">
          <v-btn
            :to="{ name: 'Cart' }"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-cart-outline"
            block
            @click="$emit('update:model-value', false)"
          >
            Ver carrinho
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-bottom-sheet>
</template>
