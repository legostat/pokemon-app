import type { IndexedPokemon } from "@app/types/pokemons";
import { PokemonCard } from "@app/components/PokemonCard/pokemon-card.component";
import styles from "./pokemons-list.module.scss";
import { indexedPokemonToListPokemon } from "@app/utils/pokemon-utils";

type PokemonListProps = {
  pokemons: IndexedPokemon[];
};

export const PokemonsList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className={styles.PokemonsList}>
      {pokemons
        ? pokemons
            .map((pokemon) => indexedPokemonToListPokemon(pokemon))
            .map((pokemon) => {
              return (
                <PokemonCard key={pokemon.pokemonIndex} pokemon={pokemon} />
              );
            })
        : null}
    </div>
  );
};
