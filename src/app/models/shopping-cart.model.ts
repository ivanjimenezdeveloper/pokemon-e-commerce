import { FormControl } from '@angular/forms';
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
export interface IShoppingCartProductForm {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}
export interface IShoppingCartProductFormControls {
  quantity: FormControl<number>;
  price: FormControl<number>;
  productId: FormControl<number>;
  productName: FormControl<string>;
}
