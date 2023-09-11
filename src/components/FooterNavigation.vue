<script setup lang="ts">
//
</script>

<template>
  <v-footer class="d-flex justify-space-between mt-4 py-0" border>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <div class="d-flex flex-column flex-md-row">
            <div class="d-flex justify-space-between justify-md-start">
              <v-btn
                variant="text"
                rounded="lg"
                size="x-small"
                :to="{ name: 'Home' }"
                :active="false"
              >
                Início
              </v-btn>

              <v-btn
                variant="text"
                rounded="lg"
                size="x-small"
                class="ms-md-6"
                :to="{ name: 'Products' }"
                :active="false"
              >
                Produtos
              </v-btn>
            </div>

            <div class="d-flex justify-space-between justify-md-start">
              <v-btn
                variant="text"
                rounded="lg"
                size="x-small"
                class="ms-md-6"
                :to="{ name: 'Cart' }"
                :active="false"
              >
                Carrinho
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mt-2">
            <div class="d-flex align-center">
              <div>
                <v-img
                  aspect-ratio="16/9"
                  src="@/assets/logo.jpeg"
                  width="80px"
                ></v-img>
              </div>

              <p class="text-caption text-center ms-4">© {{ new Date().getFullYear() }}</p>
            </div>

            <v-btn
              icon="mdi-instagram"
              variant="text"
              size="small"
              density="comfortable"
              href="https://www.instagram.com/razantesesh"
              target="_blank"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.v-footer {
  max-height: min-content;
}
</style>
