import { SetProductToCart } from './shopping-cart.action';
import {
  IShoppingCart,
  IShoppingCartProduct,
} from './../../models/shopping-cart.model';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';

@State<IShoppingCart>({
  name: 'shoppingCart',
  defaults: { products: [], total: 0 },
})
export class ShoppingCartState {
  @Action(SetProductToCart) SetProductToCart(
    ctx: StateContext<IShoppingCart>,
    { product }: SetProductToCart
  ) {
    const actualValue: IShoppingCart = ctx.getState();
    ctx.patchState({ ...actualValue, total: actualValue.total + 1 });
  }

  @Selector()
  static getTotal(state: IShoppingCart) {
    return state.total;
  }
}
