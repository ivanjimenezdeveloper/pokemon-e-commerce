import { ShoppingCartStateService } from './shopping-cart.state.service';
import { SetProductToCart } from './shopping-cart.action';
import {
  IShoppingCart,
  IShoppingCartProduct,
} from './../../models/shopping-cart.model';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';

shoppingCartStateService: ShoppingCartStateService;
@State<IShoppingCart>({
  name: 'shoppingCart',
  defaults: { products: [], total: 0 },
})
export class ShoppingCartState {
  constructor() {}

  @Action(SetProductToCart) SetProductToCart(
    ctx: StateContext<IShoppingCart>,
    { product }: SetProductToCart
  ) {
    let actualValue: IShoppingCart = ctx.getState();
    const alreadyInCart = this.pokemonAlreadyInCart(
      actualValue.products,
      product
    );

    this.addProductToCart(
      alreadyInCart,
      actualValue,
      product,
      product.quantity
    );

    ctx.patchState({
      ...actualValue,
      total: this.calcTotal(actualValue.products),
    });
  }

  @Selector()
  static getTotal(state: IShoppingCart) {
    return state.total;
  }

  @Selector()
  static getProducts(state: IShoppingCart) {
    return state;
  }

  pokemonAlreadyInCart(
    productsInCart: IShoppingCartProduct[],
    productToCheck: IShoppingCartProduct
  ): boolean {
    let productExists: boolean = false;
    for (let index = 0; index < productsInCart.length; index++) {
      productExists =
        productsInCart[index].product.id === productToCheck.product.id;
    }

    return productExists;
  }

  addProductToCart(
    alreadyInCart: boolean,
    actualValue: IShoppingCart,
    productToAdd: IShoppingCartProduct,
    quantity: number
  ): void {
    if (!alreadyInCart) {
      actualValue.products.push(productToAdd);
    } else {
      actualValue.products = actualValue.products.map(
        (product: IShoppingCartProduct) => {
          product.quantity = quantity;
          return product;
        }
      );
    }
  }

  calcTotal(products: IShoppingCartProduct[]): number {
    let total = 0;

    products.map(
      (product: IShoppingCartProduct) =>
        (total = total + product.price * product.quantity)
    );

    return total;
  }
}
