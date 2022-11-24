import { MockEmptyPokemonDetail } from 'src/app/mocks/pokemon.mock';
import {
  IShoppingCart,
  IShoppingCartProduct,
} from 'src/app/models/shopping-cart.model';

export const MockShoppingCart: IShoppingCart = {
  products: [],
  total: 0,
};

export const MockShoppingCartProducts: IShoppingCartProduct = {
  product: { ...MockEmptyPokemonDetail, id: 1 },
  quantity: 0,
};
