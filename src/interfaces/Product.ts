import Image from '@/interfaces/Image'

export default interface Product {
  id: number,
  title: string,
  price: number,
  slug: string,
  description: string,
  banner: string,
  images: Array<Image>
}
