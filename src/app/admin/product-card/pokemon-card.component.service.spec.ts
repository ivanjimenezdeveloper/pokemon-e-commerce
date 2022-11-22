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
});
