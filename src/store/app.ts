// Utilities
import { defineStore } from 'pinia'
import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import Product from '@/models/Product'
import CartProduct from '@/models/CartProduct'
import ICart from '@/interfaces/ICart'
import formatMoney from '@/utils/formatMoney'

export const useAppStore = defineStore('app', () => {
  const cart: Ref<ICart[]> = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  watch(cart.value, (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
  })

  const cartProducts: ComputedRef<CartProduct[]> = computed(
    () => cart.value.map((cart) => {
      const product = Product.find(cart.product_id)

      return new CartProduct(product, cart)
    })
  )

  const cartPrice: ComputedRef<number> = computed(
    () => cartProducts.value.reduce((total, product) => total + (product.price * product.cart_quantity), 0)
  )

  const cartDiscount: ComputedRef<number> = computed(
    () => cartProducts.value.reduce((total, product) => total + (product.discount * product.cart_quantity), 0)
  )

  const cartPriceWithoutDiscount: ComputedRef<number> = computed(
    () => cartProducts.value.reduce((total, product) => total + (product.priceWithoutDiscount * product.cart_quantity), 0)
  )

  const cartQuantity: ComputedRef<number> = computed(
    () => cartProducts.value.reduce((quantity, product) => quantity + product.cart_quantity, 0)
  )

  const showPurchaseModal: Ref<boolean> = ref(false)

  function addToCart(product_id: number, variant_id: number, quantity: number = 1): void {
    const storedCart = cart.value.find(cart => cart.product_id === product_id && cart.variant_id === variant_id)

    if (storedCart) {
      updateCartQuantity(storedCart.id, storedCart.quantity + quantity)

      showPurchaseModal.value = true

      return
    }

    cart.value.push({
      id: cart.value.length + 1,
      product_id,
      variant_id,
      quantity
    })

    showPurchaseModal.value = true
  }

  function updateCartQuantity(cart_id: number, quantity: number): void {
    const productIndex = cart.value.findIndex(cart => cart.id === cart_id)

    cart.value[productIndex].quantity = quantity
  }

  function removeFromCart(cart_id: number): void {
    const cartIndex = cart.value.findIndex(cart => cart.id === cart_id)

    cart.value.splice(cartIndex, 1);
  }

  function confirmPurchase(): void {
    let text = 'Olá! gostaria de fazer um pedido. '
    text += 'Os produtos escolhidos são:%0A%0A'

    cartProducts.value.forEach(product => {
      text += `${product.cart_quantity}x ${product.title} (${formatMoney(product.price)})`
      text += ` - `
      text += `${formatMoney(product.price * product.cart_quantity)}`

      if (product.hasFeatures()) {
        product.features.forEach((feature, index) => {
          text += `%0A`
          text += `- ${feature}: ${product.cart_variant.options[index]}`
        })
      }

      text += `%0A%0A`
    })

    text += `Total do pedido (${cartQuantity.value} ${cartQuantity.value > 1 ? 'itens' : 'item'}): `
    text += formatMoney(cartPrice.value)

    window.open(
      "https://api.whatsapp.com/send?phone=" + import.meta.env.VITE_CLIENT_WHATSAPP
      + "&text=" + text
    )
  }

  return {
    cart,
    cartProducts,
    cartPrice,
    cartDiscount,
    cartPriceWithoutDiscount,
    cartQuantity,
    showPurchaseModal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    confirmPurchase
  }
})
