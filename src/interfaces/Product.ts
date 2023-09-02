import Image from '@/interfaces/Image'

export default interface Product {
  id: number,
  title: string,
  price: number,
  slug: string,
  description: string,
  best_seller: boolean,
  banner: string,
  images: Array<Image>
}
