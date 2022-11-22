import { IPokemonTypeAPI } from './../../models/pokemon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonCardComponentService {
  constructor() {}

  getTypesPokemonString(types: IPokemonTypeAPI[]): string {
    let stringResult;

    stringResult = types[0].type.name;

    if (types.length > 1) {
      stringResult = `${stringResult}/${types[1].type.name}`;
    }

    return stringResult;
  }
}
