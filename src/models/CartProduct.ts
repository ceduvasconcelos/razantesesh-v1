import Product from '@/models/Product'
import Variant from '@/models/Variant'
import ICart from '@/interfaces/ICart'

export default class CartProduct extends Product {
  public cart_id: number
  public cart_variant: Variant
  public cart_quantity: number

  constructor(
    product: Product,
    cart: ICart
  ) {
    super(
      product.id,
      product.title,
      product.slug,
      product.description,
      product.best_seller,
      product.images,
      product.has_overlap_banner,
      product.tags,
      product.variants,
      product.features,
    )

    const cartVariant = this.variants.find(variant => variant.id === cart.variant_id)

    if (! cartVariant) {
      throw new Error("Model not found.")
    }

    this.cart_id = cart.id
    this.cart_variant = cartVariant
    this.cart_quantity = cart.quantity
  }

  public get price(): number {
    return this.cart_variant.price
  }

  public get discount(): number {
    return this.cart_variant.discount
  }

  public get priceWithoutDiscount(): number {
    return this.cart_variant.price + ((this.cart_variant.price * this.cart_variant.discount) / 100)
  }
}
