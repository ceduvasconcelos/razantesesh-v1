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
  <v-navigation-drawer
    touchless
    disable-resize-watcher
    :model-value="modelValue"
    @update:model-value="value => $emit('update:model-value', value)"
  >
    <v-list density="compact" :lines="false" nav>
      <v-list-item title="Início" :to="{ name: 'Home' }" :active="false"></v-list-item>
      <v-list-item title="Produtos" :to="{ name: 'Products' }" :active="false"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
