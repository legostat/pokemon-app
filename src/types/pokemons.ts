export type IndexedPokemon = {
  name: string;
  url: string;
};

export type PokemonsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IndexedPokemon[];
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
  stat: {
    name: string;
  };
  base_stat: number;
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

export type IndexedPokemonByType = {
  pokemon: IndexedPokemon;
  slot: string;
};

export type PokemonsByTypeListResponse = {
  id: number;
  pokemon: IndexedPokemonByType[];
};
