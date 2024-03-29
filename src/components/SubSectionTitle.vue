<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="d-flex align-center">
    <div class="text-h5 font-weight-medium text-no-wrap me-2 me-auto">
      {{ title }}
    </div>

    <slot name="append"></slot>
  </div>
</template>
