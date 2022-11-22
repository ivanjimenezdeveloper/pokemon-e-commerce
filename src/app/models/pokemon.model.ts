export interface IPokemonListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItemApiResponse[];
}

export interface IPokemonListItemApiResponse {
  results: any;
  name: string;
  url: string;
}

export interface IPokemonDetails {
  id: number;
  name: string;
  order: number;
  types: IPokemonTypeAPI[];
  abilities: IPokemonAbility[];
  stats_fix: IPokemonStatsFixed;
  stats: IPokemonStat[];
  sprites: {
    front_default: string;
    back_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
}
export interface IPokemonStatsFixed {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface IPokemonTypeAPI {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
  };
}

export interface IPokemonSpecies {
  flavor_text_entries: IFlavorTextEntry[];
}
export interface IFlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}
