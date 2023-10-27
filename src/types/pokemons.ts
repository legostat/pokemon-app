export type IndexedPokemon = {
  name: string;
  url: string;
};

export type PokemonsListResponse = {
  count?: number;
  next?: string | null;
  previuos?: string | null;
  results?: IndexedPokemon[];
};

export type ListPokemon = IndexedPokemon & {
  image: string;
  pokemonIndex: number;
};

type PokemonAbilities = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

type PokemonMove = {
  move: {
    name: string;
  };
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

export type DetailPokemon = {
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  abilities: PokemonAbilities[];
  moves: PokemonMove[];
  stats: PokemonStat[];
};
