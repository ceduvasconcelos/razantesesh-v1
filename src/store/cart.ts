import { defineStore } from 'pinia'
import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import Product from '@/interfaces/Product'
import Cart from '@/interfaces/Cart'

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<Cart[]> = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  watch(cart.value, (cart) => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  )

  const appStore = useAppStore()

  const showPurchaseModal: Ref<boolean> = ref(false)

  const products: ComputedRef<Product[] | undefined> = computed(
    () => appStore.whereIn(cart.value.map(pivot => pivot.product_id))
  )

  const productQuantity = (product_id: number): number =>
    cart.value?.find(pivot => pivot.product_id === product_id)?.quantity || 0


  const total: ComputedRef<number> = computed(
    () => products.value?.reduce((total, product) => total + (product.price * productQuantity(product.id)), 0) || 0
  )

  const quantity: ComputedRef<number> = computed(
    () => products.value?.reduce((quantity, product) => quantity + productQuantity(product.id), 0) || 0
  )

  function add(product_id: number, quantity: number = 1): void {
    if (! appStore.find(product_id)) {
      return
    }

    const productInCart = cart.value.find(pivot => pivot.product_id === product_id)

    if (productInCart) {
      updateQuantity(product_id, quantity + productInCart.quantity)

      showPurchaseModal.value = true

      return
    }

    cart.value.push({ product_id, quantity })

    showPurchaseModal.value = true
  }

  function updateQuantity(product_id: number, quantity: number): void {
    const productIndex = cart.value.findIndex(pivot => pivot.product_id === product_id)

    cart.value[productIndex].quantity = quantity
  }

  function remove(product_id: number): void {
    const productIndex = cart.value.findIndex(pivot => pivot.product_id === product_id)

    cart.value.splice(productIndex, 1);
  }

  function confirm(): void {
    let text = 'Olá! gostaria de fazer um pedido. '
    text += 'Os produtos escolhidos são:%0A%0A'

    products.value?.forEach(product => {
      text += `_${productQuantity(product.id)}x ${product.title} (R$ ${product.price},00) - R$ ${product.price * productQuantity(product.id)},00_%0A%0A`
    });

    text += `Total do pedido (${quantity.value} ${quantity.value > 1 ? 'itens' : 'item' }): `
    text += `R$ ${total.value},00`

    window.open(`https://api.whatsapp.com/send?phone=5585981887454&text=${text}`);
  }

  return {
    products,
    total,
    quantity,
    showPurchaseModal,
    productQuantity,
    add,
    remove,
    updateQuantity,
    confirm
  }
})
