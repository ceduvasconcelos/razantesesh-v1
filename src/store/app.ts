// Utilities
import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import productsJson from '@/products.json'
import Product from '@/interfaces/Product'
// @ts-ignore
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

export const useAppStore = defineStore('app', () => {
  const products: Ref<Product[]> = ref(productsJson)

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

  function orderBy(type: string): Product[] {
    if (type === 'best_sellers')
      return products.value.sort(
        (a, b) => (a.best_seller === b.best_seller) ? 0 : a.best_seller ? -1 : 1
      )

    if (type === 'lowest_price')
      return products.value.sort(
        (a, b) => a.price - b.price
      )

    if (type === 'biggest_price')
      return products.value.sort(
        (a, b) => b.price - a.price
      )

    return products.value
  }

  return { products, find, findBySlug, whereIn, orderBy }
})
