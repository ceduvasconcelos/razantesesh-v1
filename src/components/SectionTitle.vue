<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: String
})
</script>

<template>
  <div class="d-flex align-baseline">
    <h1 class="text-h5 text-no-wrap font-weight-medium me-2">{{ title }}</h1>

    <v-icon
      v-if="icon"
      color="error"
      :icon="icon"
      class="me-2"
    ></v-icon>

    <v-divider></v-divider>

    <slot name="append"></slot>
  </div>
</template>
