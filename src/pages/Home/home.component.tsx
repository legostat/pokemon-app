import { PokemonsList } from "@app/components/PokemonsList/pokemons-list.component";
import styles from "./home.module.scss";
import { useAppSelector } from "@app/store/hooks";
import { selectPokemonsList } from "@app/store/features/pokemonsSlice";

export const Home = () => {
  const pokemons = useAppSelector(selectPokemonsList);

  return (
    <div className={styles.home}>{<PokemonsList pokemons={pokemons} />}</div>
  );
};
