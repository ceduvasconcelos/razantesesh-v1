import productsJson from '@/data/products.json'
import Variant from '@/models/Variant'

export default class Product {
  constructor(
    public id: number,
    public title: string,
    public slug: string,
    public description: string,
    public best_seller: boolean,
    public images: any[],
    public has_overlap_banner: boolean,
    public tags: any[],
    public _variants: any[],
    public features: any[],
  ) {
    this.id = id
    this.title = title
    this.slug = slug
    this.description = description
    this.best_seller = best_seller
    this.images = images
    this.has_overlap_banner = has_overlap_banner
    this.tags = tags
    this._variants = _variants
    this.features = features
  }

  public get price(): number {
    return this.variants[0].price
  }

  public get discount(): number {
    return this.variants[0].discount
  }

  public get priceWithoutDiscount(): number {
    return this.variants[0].priceWithoutDiscount
  }

  public get banner(): string {
    return this.images[0]
  }

  public get overlap_banner(): string {
    return this.images[1]
  }

  public get variants(): Variant[] {
    const variants: any[] = []

    this._variants.forEach(variant => {
      variants.push(
        new Variant(
          variant.id,
          variant.price,
          variant.discount,
          variant.options,
        )
      )
    })

    return variants
  }

  public hasFeatures(): boolean {
    return this.features.length ? true : false
  }

  public static bestSellers(): Product[] {
    return Product.all().filter((product) => product.best_seller)
  }

  public static all(): Product[] {
    const products: any = []

    productsJson.forEach(product => {
      products.push(
        new Product(
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
      )
    })

    return products
  }

  public static find(id: number): Product {
    const product = Product.all().find(product => product.id === id)

    if (! product) {
      throw new Error("Model not found.")
    }

    return product
  }

  public static findBySlug(slug: string): Product {
    const product = Product.all().find(product => product.slug === slug)

    if (! product) {
      throw new Error("Model not found.")
    }

    return product
  }

  public static whereIn(productsId: number[]): (Product)[] {
    const filteredProducts = Product.all().filter(product => productsId.includes(product.id))

    if (! filteredProducts) {
      throw new Error("Model not found.")
    }

    return filteredProducts
  }

  public static orderBy(type: string): Product[] {
    if (type === 'most_recent') {
      return Product.all().sort((a, b) => a.id - b.id)
    }

    if (type === 'best_sellers') {
      return Product.all().sort((a, b) => (a.best_seller === b.best_seller) ? 0 : a.best_seller ? -1 : 1)
    }

    if (type === 'lowest_price') {
      return Product.all().sort((a, b) => a.price - b.price)
    }

    if (type === 'biggest_price') {
      return Product.all().sort((a, b) => b.price - a.price)
    }

    return Product.all()
  }
}
