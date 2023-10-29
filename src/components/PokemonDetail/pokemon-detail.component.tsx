import { DetailPokemon } from "@app/types/pokemons";
import styles from "./pokemon-detail.module.scss";

type PokemonDetailProps = {
  pokemon: DetailPokemon;
};

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  return (
    <div className={styles.pokemonDetail}>
      <div className={styles.pokemonDetail__left}>
        <div className={styles.pokemonDetail__img__container}>
          <img
            className={styles.pokemonDetail__img}
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
        <h1 className={styles.pokemonDetail__title}>{pokemon?.name}</h1>
      </div>
      <div className={styles.pokemonDetail__right}>
        <div className={styles.pokemonDetail__info}>
          <section>
            <h2 className={styles.pokemonDetail__list_title}>Stats</h2>
            <ul className={styles.pokemonDetail__stats}>
              <li>Height: {pokemon.height}</li>
              <li>Weight: {pokemon.weight}</li>
              {pokemon.stats.map(({ stat: { name }, base_stat }) => (
                <li>
                  {name}: {base_stat}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className={styles.pokemonDetail__list_title}>Abilities</h2>
            <ul className={styles.pokemonDetail__abilities}>
              {pokemon.abilities.map(({ ability: { name }, is_hidden }) => (
                <li>{name}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className={styles.pokemonDetail__list_title}>Moves</h2>
            <ul className={styles.pokemonDetail__moves}>
              {pokemon.moves.map(({ move: { name } }) => (
                <li> {name} </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
