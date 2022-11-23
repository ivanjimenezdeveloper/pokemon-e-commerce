import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonCardComponentService } from './pokemon-card.component.service';
import {
  IPokemonDetails,
  IPokemonListItemApiResponse,
} from './../../models/pokemon.model';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { filter } from 'lodash';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  pokemon?: IPokemonListItemApiResponse;

  @Input()
  pokemonTypeFilter?: Observable<string>;

  @HostBinding('class.d-none') hidePokemon: boolean = false;

  pokemonDetail?: IPokemonDetails;
  constructor(
    private pokemonCardService: PokemonCardComponentService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemonDetails();
    this.checkFilter();
  }

  getTypesString(pokemon: IPokemonDetails): string {
    return this.pokemonCardService.getTypesPokemonString(pokemon.types);
  }

  private getPokemonDetails(): void {
    if (this.pokemon) {
      this.pokemonService
        .getPokemonDetailsWithURL(this.pokemon.url)
        .subscribe((result: IPokemonDetails) => (this.pokemonDetail = result));
    }
  }

  private checkFilter(): void {
    this.pokemonTypeFilter?.subscribe(
      (filter: string) =>
        (this.hidePokemon = !this.pokemonCardService.getShowPokemonByFilterType(
          filter,
          this.pokemonDetail?.types ? this.pokemonDetail?.types : []
        ))
    );
  }
}
