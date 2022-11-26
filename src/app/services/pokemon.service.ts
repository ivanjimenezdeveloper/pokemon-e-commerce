import {
  IShoppingCartFormData,
  IShoppingCartProduct,
} from 'src/app/models/shopping-cart.model';
import {
  ILandingPageOffer,
  IPokemonListItemApiResponse,
  ITypesListApiResponse,
} from './../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IPokemonDetails,
  IPokemonListApiResponse,
  IPokemonSpecies,
  IPokemonStat,
} from '../models/pokemon.model';

import { of } from 'rxjs';
import { MockPokemonImages } from '../mocks/pokemon.mock';
import { result } from 'lodash';
import { firstLetterToUpperCase } from '../utilities/strings';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'https://pokeapi.co/api/v2/';

  getPokemonList(
    limit: number,
    offset: number
  ): Observable<IPokemonListApiResponse> {
    return this.http
      .get<IPokemonListApiResponse>(`${this.baseUrl}pokemon`, {
        params: {
          limit,
          offset,
        },
      })
      .pipe(map(this.getPokemonListNamesToUpperCase));
  }

  getTypesList(): Observable<ITypesListApiResponse> {
    return this.http.get<ITypesListApiResponse>(`${this.baseUrl}type`);
  }

  getPokemonDetails(id: number): Observable<IPokemonDetails> {
    return this.http
      .get<IPokemonDetails>(`${this.baseUrl}pokemon/${id}`)
      .pipe(map((pokemon: IPokemonDetails) => this.fixPokemonDetails(pokemon)));
  }

  getPokemonDetailsWithURL(url: string): Observable<IPokemonDetails> {
    return this.http.get<IPokemonDetails>(url).pipe(
      map((pokemon: IPokemonDetails) => {
        return this.fixPokemonDetails(pokemon);
      })
    );
  }

  getPokemonDescriptionById(id: number): Observable<string> {
    return this.http
      .get<IPokemonSpecies>(`${this.baseUrl}pokemon-species/${id}`)
      .pipe(
        map(
          (pokemonSpecies: IPokemonSpecies) =>
            pokemonSpecies.flavor_text_entries[0].flavor_text
        )
      );
  }

  getOffers(): Observable<ILandingPageOffer[]> {
    return of([
      {
        subtitle: 'Cuidao que pica',
        title: 'Veneno',
        description: 'Compra pokemons de tipo veneno YA',
        type: 'poison',
      },
      {
        subtitle: 'Cuidao que kema',
        title: 'Fuego',
        description: 'Compra pokemons de tipo Fuego YA',
        type: 'fire',
      },
      {
        subtitle: 'Cuidao que moja',
        title: 'Agua',
        description: 'Compra pokemons de tipo Agua YA',
        type: 'water',
      },
      {
        subtitle: 'Cuidao que no se, no te lo comas',
        title: 'Planta',
        description: 'Compra pokemons de tipo Planta YA',
        type: 'grass',
      },
    ]);
  }

  getQuantityFromShoppingCart(
    productsShopping: IShoppingCartProduct[],
    pokemonId: number
  ): number {
    const result: IShoppingCartProduct | undefined = productsShopping.find(
      (pokemon: IShoppingCartProduct) => pokemon.product.id === pokemonId
    );

    return result ? result.quantity : 0;
  }

  getPokemonImageByType(type: string): Observable<string> {
    return of(
      //@ts-ignore
      MockPokemonImages[`${type}`]
    );
  }

  BuyProducts(purchase: IShoppingCartFormData): Observable<boolean> {
    if (purchase) return of(true);

    return of(false);
  }

  private fixPokemonDetails(pokemonResponse: IPokemonDetails): IPokemonDetails {
    return {
      ...this.fixPokemonStats(pokemonResponse),
      name: firstLetterToUpperCase(pokemonResponse.name),
    };
  }

  private getPokemonListNamesToUpperCase(
    pokemonResponse: IPokemonListApiResponse
  ): IPokemonListApiResponse {
    return {
      ...pokemonResponse,
      results: pokemonResponse.results.map(
        (pokemonMap: IPokemonListItemApiResponse) => {
          return {
            ...pokemonMap,
            name: firstLetterToUpperCase(pokemonMap.name),
          };
        }
      ),
    };
  }

  private fixPokemonStats(pokemon: IPokemonDetails): IPokemonDetails {
    this.initPokemonStatsFix(pokemon);
    pokemon.stats.forEach((stat: IPokemonStat) => {
      this.setPokemonStat(pokemon, stat);
    });
    return pokemon;
  }

  private setPokemonStat(pokemon: IPokemonDetails, stat: IPokemonStat): void {
    if (stat.stat.name === 'hp') {
      pokemon.stats_fix.hp = stat.base_stat;
    } else if (stat.stat.name === 'attack') {
      pokemon.stats_fix.attack = stat.base_stat;
    } else if (stat.stat.name === 'defense') {
      pokemon.stats_fix.defense = stat.base_stat;
    } else if (stat.stat.name === 'special-attack') {
      pokemon.stats_fix.special_attack = stat.base_stat;
    } else if (stat.stat.name === 'special-defense') {
      pokemon.stats_fix.special_defense = stat.base_stat;
    } else if (stat.stat.name === 'speed') {
      pokemon.stats_fix.speed = stat.base_stat;
    }
  }
  private initPokemonStatsFix(pokemon: IPokemonDetails): void {
    pokemon.stats_fix = {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
    };
  }
}
