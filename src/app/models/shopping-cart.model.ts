import { IPokemonDetails } from './pokemon.model';
export interface IShoppingCart {
  products: IShoppingCartProduct[];
  total: number;
}

export interface IShoppingCartProduct {
  product: IPokemonDetails;
  quantity: number;
  price: number;
}
