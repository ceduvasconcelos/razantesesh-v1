export default class Variant {
  constructor(
    public id: number,
    public _price: number,
    public discount: number,
    public options: any[],
  ) {
    this.id = id
    this._price = _price
    this.discount = discount
    this.options = options
  }

  public get price(): number {
    return this._price - ((this._price * this.discount) / 100)
  }

  public get priceWithoutDiscount(): number {
    return this.price + ((this._price * this.discount) / 100)
  }
}
