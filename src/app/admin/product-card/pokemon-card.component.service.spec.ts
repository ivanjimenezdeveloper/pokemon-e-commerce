import { IPokemonTypeAPI } from './../../models/pokemon.model';
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
});
