// Utilities
import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import productsJson from '@/products.json'
import Product from '@/interfaces/Product'

export const useAppStore = defineStore('app', () => {
  const products: Ref<Product[]> = ref(productsJson)

  function find(id: number): Product | undefined {
    return products.value.find(product => product.id === id)
  }

  function findBySlug(slug: string): Product | undefined {
    return products.value.find(product => product.slug === slug)
  }

  function whereIn(products_id: Array<number>): Array<Product> | undefined {
    return products.value.filter(product => products_id.includes(product.id))
  }

  return { products, find, findBySlug, whereIn }
})
