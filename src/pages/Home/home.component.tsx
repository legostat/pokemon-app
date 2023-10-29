import { useAppSelector } from "@app/store/hooks";
import { selectPokemonsList } from "@app/store/features/pokemonsSlice";
import { PokemonsList } from "@app/components/PokemonsList/pokemons-list.component";

import styles from "./home.module.scss";
import { Pagination } from "@app/components/Pagination/pagination.component";

export const Home = () => {
  const pokemons = useAppSelector(selectPokemonsList);

  return (
    <div className={styles.home}>
      <PokemonsList pokemons={pokemons} />
      <Pagination />
    </div>
  );
};
