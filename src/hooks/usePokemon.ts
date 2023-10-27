import { useEffect, useState } from "react";
import { type DetailPokemon } from "@app/types/pokemons";
import { POKEMON_API_POKEMON_URL } from "@app/config";
import { httpClient } from "@app/api/httpClient";

type UsePokemonProps = {
  pokemonName: string | undefined;
};

export const usePokemon = ({ pokemonName }: UsePokemonProps) => {
  const [pokemon, setPokemon] = useState<DetailPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName]);

  const fetchPokemon = async () => {
    setIsLoading(true);
    const url = `${POKEMON_API_POKEMON_URL}/${pokemonName}`;
    const { data } = await httpClient.get<DetailPokemon>(url);
    setPokemon(data);
    setIsLoading(false);
  };

  return {
    pokemon,
    isLoading,
  };
};
