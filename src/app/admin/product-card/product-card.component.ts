import { SetProductToCart } from 'src/app/store/shopping-cart/shopping-cart.action';
import { IShoppingCart } from './../../models/shopping-cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonCardComponentService } from './pokemon-card.component.service';
import {
  IPokemonDetails,
  IPokemonListItemApiResponse,
} from './../../models/pokemon.model';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { filter } from 'lodash';
import { Store } from '@ngxs/store';

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

  @Input()
  productsInCart: IShoppingCart = {
    products: [],
    total: 0,
  };

  @HostBinding('class.d-none') hidePokemon: boolean = false;

  pokemonDetail?: IPokemonDetails;
  quantitySelected: number = 0;

  constructor(
    private pokemonCardService: PokemonCardComponentService,
    private pokemonService: PokemonService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getPokemonDetails();
    this.checkFilter();
  }

  getTypesString(pokemon: IPokemonDetails): string {
    return this.pokemonCardService.getTypesPokemonString(pokemon.types);
  }

  setProductInCart(quantitySelected: number) {
    if (this.pokemonDetail) {
      this.quantitySelected = quantitySelected;
      this.store.dispatch(
        new SetProductToCart({
          product: { ...this.pokemonDetail },
          quantity: this.quantitySelected,
        })
      );
    }
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
