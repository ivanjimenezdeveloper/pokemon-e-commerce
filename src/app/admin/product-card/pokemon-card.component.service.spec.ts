import { MockEmptyPokemonDetail } from 'src/app/mocks/pokemon.mock';
import {
  IShoppingCart,
  IShoppingCartProduct,
} from 'src/app/models/shopping-cart.model';
import { MockPokemonTypeGrass } from './../../mocks/pokemon.mock';
import { IPokemonTypeAPI, IPokemonDetails } from './../../models/pokemon.model';
import { TestBed } from '@angular/core/testing';

import { PokemonCardComponentService } from './pokemon-card.component.service';

describe('PokemonCardComponentService', () => {
  let service: PokemonCardComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCardComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return grass/poison - (getTypesPokemonString)', () => {
    const pokemonType: IPokemonTypeAPI[] = [
      {
        slot: 0,
        type: { name: 'grass', url: '' },
      },
      {
        slot: 0,
        type: { name: 'poison', url: '' },
      },
    ];

    expect(service.getTypesPokemonString(pokemonType)).toBe('grass/poison');
  });

  it('should return false given a pokemon with type grass - (getShowPokemonByFilterType)', () => {
    MockPokemonTypeGrass;
    const paramTypes: IPokemonTypeAPI[] = [
      { ...MockPokemonTypeGrass, type: { name: 'grass', url: '' } },
    ];
    let result: boolean;

    const paramTypeFilter: string = 'poison';
    result = service.getShowPokemonByFilterType(paramTypeFilter, paramTypes);

    expect(result).toBeFalse();
  });

  it('should return true given a pokemon with type grass - (getShowPokemonByFilterType)', () => {
    MockPokemonTypeGrass;
    const paramTypes: IPokemonTypeAPI[] = [{ ...MockPokemonTypeGrass }];
    const paramTypeFilter: string = 'grass';
    let result: boolean;

    result = service.getShowPokemonByFilterType(paramTypeFilter, paramTypes);

    expect(result).toBeTrue();
  });

  it('should return 16,50 given a id 1 - (calcPriceOfPokemon)', () => {
    const paramPokemonGiven: number = 1;

    const result: number = service.calcPriceOfPokemon(paramPokemonGiven);

    expect(result).toBe(16.5);
  });

  it('should return 8,20 given a id 537 - (calcPriceOfPokemon)', () => {
    const paramPokemonGiven: number = 537;

    const result: number = service.calcPriceOfPokemon(paramPokemonGiven);

    expect(result).toBe(82.05);
  });
});
