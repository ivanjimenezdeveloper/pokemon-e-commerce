import { IShoppingCartProduct } from './../../models/shopping-cart.model';

export class SetProductToCart {
  static readonly type = '[shopping-cart] set product to cart';
  constructor(public product: IShoppingCartProduct) {}
}

export class getProductById {
  static readonly type = '[shopping-cart] get product if its in the cart';
  constructor(public productId: number) {}
}
