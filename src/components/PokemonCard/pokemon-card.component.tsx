import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ListPokemon } from "@app/types/pokemons";
import { getColorFromUrl } from "@app/utils/colors";
import styles from "./pokemon-card.module.scss";

type PokemonCardProps = {
  pokemon: ListPokemon;
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [pokemonColor, setPokemonColor] = useState<string | null>(null);

  const getPokemonColor = async () => {
    const color = await getColorFromUrl(pokemon.image);
    if (color) setPokemonColor(color);
  };

  useEffect(() => {
    getPokemonColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className={styles.PokemonCard}
      style={{ "--pokemon-color": pokemonColor } as React.CSSProperties}
    >
      <img
        className={styles.PokemonCard__img}
        src={pokemon.image}
        alt={pokemon.name}
      />
      <h2 className={styles.PokemonCard__title}>{pokemon.name}</h2>
    </Link>
  );
};
