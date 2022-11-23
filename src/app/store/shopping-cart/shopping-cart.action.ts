import { IShoppingCartProduct } from './../../models/shopping-cart.model';
import { IPokemonDetails } from './../../models/pokemon.model';
export class SetProductToCart {
  static readonly type = '[shopping-cart] set product to cart';
  constructor(public product: IShoppingCartProduct) {}
}
