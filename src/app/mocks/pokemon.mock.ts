import { IPokemonTypeAPI, IPokemonDetails } from './../models/pokemon.model';
export const MockPokemonTypeGrass: IPokemonTypeAPI = {
  slot: 0,
  type: { name: 'grass', url: '' },
};

export const MockEmptyPokemonDetail: IPokemonDetails = {
  abilities: [],
  id: 0,
  name: '',
  order: 0,
  sprites: {
    back_default: '',
    front_default: '',
    other: { 'official-artwork': { front_default: '' } },
  },
  stats: [],
  stats_fix: {
    attack: 0,
    defense: 0,
    hp: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  },
  types: [],
};

export const MockPokemonImages = {
  grass:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
  fire: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  poison:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png',
  water:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
};
