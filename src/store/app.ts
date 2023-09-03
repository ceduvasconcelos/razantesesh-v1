// Utilities
import { defineStore } from 'pinia'
import { computed, ComputedRef, ref, Ref } from 'vue'
import productsJson from '@/products.json'
import Product from '@/interfaces/Product'
// @ts-ignore
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

export const useAppStore = defineStore('app', () => {
  const products: Ref<Product[]> = ref(productsJson)

  const bestSellers: ComputedRef<Product[]> = computed(
    () => products.value.filter((product) => product.best_seller)
  )

  // only for development
  products.value = products.value.map(
    (product) => {
      product.title = faker.commerce.productName(),
      product.description = faker.commerce.productDescription()
      return product
    }
  )

  function find(id: number): Product | undefined {
    return products.value.find(product => product.id === id)
  }

  function findBySlug(slug: string): Product | undefined {
    return products.value.find(product => product.slug === slug)
  }

  function whereIn(products_id: Array<number>): Array<Product> | undefined {
    return products.value.filter(product => products_id.includes(product.id))
  }

  function orderBy(type: string): void {
    products.value.sort((a, b) => a.id - b.id)

    if (type === 'best_sellers')
      products.value.sort(
        (a, b) => (a.best_seller === b.best_seller) ? 0 : a.best_seller ? -1 : 1
      )

    if (type === 'lowest_price')
      products.value.sort(
        (a, b) => a.price - b.price
      )

    if (type === 'biggest_price')
      products.value.sort(
        (a, b) => b.price - a.price
      )
  }

  function reset(): void {
    products.value = [...productsJson]
  }

  return { products, bestSellers, find, findBySlug, whereIn, orderBy, reset }
})
