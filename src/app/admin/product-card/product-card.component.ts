import { PokemonCardComponentService } from './pokemon-card.component.service';
import { IPokemonDetails } from './../../models/pokemon.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input()
  pokemon?: IPokemonDetails;
  constructor(private pokemonCardService: PokemonCardComponentService) {}

  getTypesString(pokemon: IPokemonDetails): string {
    return this.pokemonCardService.getTypesPokemonString(pokemon.types);
  }
}
