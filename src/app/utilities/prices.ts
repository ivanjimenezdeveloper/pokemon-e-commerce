import { IPokemonDetails } from './../models/pokemon.model';
export const calcPriceOfPokemon = (pokemon: IPokemonDetails): number => {
  return (pokemon.id + 10) * 1.5;
};
