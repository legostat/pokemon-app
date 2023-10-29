import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import {
  selectPokemonsType,
  fetchPokemonsByType,
  fetchPokemons,
} from "@app/store/features/pokemonsSlice";
import { POKEMON_API_POKEMON_URL, POKEMON_TYPES } from "@app/config";
import styles from "./filter.module.scss";
import type { IndexedType } from "@app/types/types";

export const Filter = () => {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector(selectPokemonsType);

  const handleSelectType = (type: IndexedType | null) => {
    if (type) {
      dispatch(fetchPokemonsByType(type));
    } else {
      dispatch(fetchPokemons(POKEMON_API_POKEMON_URL));
    }
  };

  return (
    <div className={styles.Filter}>
      <button
        onClick={() => handleSelectType(null)}
        className={`${styles.Filter__item} ${
          selectedType ? "" : styles.active
        }`}
      >
        All
      </button>
      {POKEMON_TYPES.map((type) => (
        <button
          key={type.name}
          onClick={() => handleSelectType(type)}
          className={`${styles.Filter__item} ${
            selectedType?.name === type.name ? styles.active : ""
          } `}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};
