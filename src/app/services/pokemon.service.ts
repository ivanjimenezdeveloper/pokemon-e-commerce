import { IPokemonListItemApiResponse } from './../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
import {
  IPokemonDetails,
  IPokemonListApiResponse,
  IPokemonSpecies,
  IPokemonStat,
  IPokemonTypeAPI,
} from '../models/pokemon.model';
import { compareByProperty } from '../utilities/array';
import { sortBy } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'https://pokeapi.co/api/v2/';
  private $pokemonDetailList: BehaviorSubject<IPokemonDetails[]> =
    new BehaviorSubject<IPokemonDetails[]>([]);

  getPokemonList(
    limit: number,
    offset: number
  ): Observable<IPokemonListApiResponse> {
    return this.http.get<IPokemonListApiResponse>(`${this.baseUrl}pokemon`, {
      params: {
        limit,
        offset,
      },
    });
  }

  getPokemonDetails(id: number): Observable<IPokemonDetails> {
    return this.http
      .get<IPokemonDetails>(`${this.baseUrl}pokemon/${id}`)
      .pipe(map((pokemon: IPokemonDetails) => this.fixPokemonStats(pokemon)));
  }

  getPokemonListDetailsVariable(): Observable<IPokemonDetails[]> {
    return this.$pokemonDetailList.asObservable();
  }

  getPokemonListDetails(limit: number, offset: number) {
    let auxPokemonList: IPokemonDetails[] = [];
    this.getPokemonList(limit, offset).subscribe(
      (pokemon: IPokemonListApiResponse) =>
        this.getDetaislOfPokemonList(pokemon, auxPokemonList, limit)
    );
  }

  getPokemonDetailsWithURL(url: string): Observable<IPokemonDetails> {
    return this.http
      .get<IPokemonDetails>(url)
      .pipe(map((pokemon: IPokemonDetails) => this.fixPokemonStats(pokemon)));
  }

  getPokemonCardColor(pokemon: IPokemonDetails): string {
    return `background-color-${pokemon.types[0].type.name}`;
  }

  getPokemonTypeColor(type: IPokemonTypeAPI): string {
    return `btn-${type.type.name}`;
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

  private getDetaislOfPokemonList(
    pokemon: IPokemonListApiResponse,
    pokemonListToAdd: IPokemonDetails[],
    limit: number
  ) {
    pokemon.results.map((pokemonResult: IPokemonListItemApiResponse) =>
      this.getPokemonDetailsWithURL(pokemonResult.url).subscribe(
        (pokemonWithDetail) =>
          this.addPokemonToPokemonDetailList(
            pokemonWithDetail,
            pokemonListToAdd,
            limit
          )
      )
    );
  }
  private addPokemonToPokemonDetailList(
    pokemonWithDetail: IPokemonDetails,
    pokemonListToAdd: IPokemonDetails[],
    limit: number
  ) {
    pokemonListToAdd.push(pokemonWithDetail);
    if (pokemonListToAdd.length === limit) {
      this.$pokemonDetailList.next(
        sortBy(pokemonListToAdd, [(pokemon) => pokemon.id])
      );
    }
  }
  private fixPokemonStats(pokemon: IPokemonDetails) {
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
