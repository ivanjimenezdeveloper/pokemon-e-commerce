import { MockEmptyPokemonDetail } from 'src/app/mocks/pokemon.mock';
import { IShoppingCartProduct } from 'src/app/models/shopping-cart.model';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 3 given a product with 3 of quantity - (getQuantityFromShoppingCart)', () => {
    const paramShoppingCart: IShoppingCartProduct[] = [
      {
        product: { ...MockEmptyPokemonDetail, id: 1 },
        quantity: 3,
        price: 0,
      },
    ];

    const paramPokemonId = 1;

    const result: number = service.getQuantityFromShoppingCart(
      paramShoppingCart,
      paramPokemonId
    );

    expect(result).toBe(3);
  });

  it('should return 0 given a product with 3 of quantity - (getQuantityFromShoppingCart)', () => {
    const paramShoppingCart: IShoppingCartProduct[] = [];
    const paramPokemonId = 1;

    const result: number = service.getQuantityFromShoppingCart(
      paramShoppingCart,
      paramPokemonId
    );

    expect(result).toBe(0);
  });
});
