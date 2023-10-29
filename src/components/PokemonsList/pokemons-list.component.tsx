import type { ListPokemon } from "@app/types/pokemons";
import { PokemonCard } from "@app/components/PokemonCard/pokemon-card.component";
import styles from "./pokemons-list.module.scss";

type PokemonListProps = {
  pokemons: ListPokemon[];
};

export const PokemonsList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className={styles.PokemonsList}>
      {pokemons
        ? pokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.pokemonIndex} pokemon={pokemon} />;
          })
        : null}
    </div>
  );
};
