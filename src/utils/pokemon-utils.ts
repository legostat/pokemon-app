import { POKEMON_API_IMG_URL } from "../config";
import { type ListPokemon, type IndexedPokemon } from "../types/pokemons";

export const indexedPokemonToListPokemon = (
  indexedPokemon: IndexedPokemon
): ListPokemon => {
  const parsedUrl = /(?<=\/)\d+/.exec(indexedPokemon.url)?.[0];
  const pokemonIndex = parsedUrl ? parseInt(parsedUrl) : 0;
  return {
    name: indexedPokemon.name,
    url: indexedPokemon.url,
    image: `${POKEMON_API_IMG_URL}/${pokemonIndex}.png`,
    pokemonIndex,
  };
};
