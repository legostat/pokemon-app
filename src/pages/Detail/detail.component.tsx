import { Link, useParams } from "react-router-dom";
import { usePokemon } from "@app/hooks/usePokemon";
import { PokemonDetail } from "@app/components/PokemonDetail/pokemon-detail.component";

import styles from "./detail.module.scss";

export const Detail = () => {
  const { pokemonName } = useParams();
  const { pokemon } = usePokemon({ pokemonName });

  return (
    <div className={styles.detail}>
      {pokemon ? <PokemonDetail pokemon={pokemon} /> : null}
      <div className={styles.detail__btn__wrapper}>
        <Link className={styles.detail__btn} to="/">
          Back
        </Link>
      </div>
    </div>
  );
};
