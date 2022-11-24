import { MockShoppingCartProducts } from './../../mocks/shopping-cart.mock';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import {
  IShoppingCart,
  IShoppingCartProduct,
} from 'src/app/models/shopping-cart.model';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

describe('Service: ShoppingCart.state', () => {
  let service: ShoppingCartState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartState],
    });

    service = TestBed.inject(ShoppingCartState);
  });

  it('should ...', inject([ShoppingCartState], (service: ShoppingCartState) => {
    expect(service).toBeTruthy();
  }));

  it('should return true with a pokemon with id equal to 1- (pokemonAlreadyInCart)', () => {
    const dataGiven: IShoppingCartProduct[] = [{ ...MockShoppingCartProducts }];
    const dataRecieved: IShoppingCartProduct = { ...MockShoppingCartProducts };
    const result: boolean = service.pokemonAlreadyInCart(
      dataGiven,
      dataRecieved
    );

    expect(result).toBeTrue();
  });

  it('should return false with a pokemon with id equal to 1- (pokemonAlreadyInCart)', () => {
    const dataGiven: IShoppingCartProduct[] = [{ ...MockShoppingCartProducts }];
    const dataRecieved: IShoppingCartProduct = {
      ...MockShoppingCartProducts,
      //@ts-ignore
      product: { id: 32 },
    };
    const result: boolean = service.pokemonAlreadyInCart(
      dataGiven,
      dataRecieved
    );

    expect(result).toBeFalse();
  });

  it('should do the test of calcTotal', () => {
    expect(false).toBe(true);
  });
});
