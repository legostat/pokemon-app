import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@app/store/hooks";
import {
  selectPokemonsType,
  selectPokemonsList,
  selectPokemonsLoadingStatus,
} from "@app/store/features/pokemonsSlice";
import { clearSearchResult } from "@app/store/features/searchSlice";

import { PokemonsList } from "@app/components/PokemonsList/pokemons-list.component";
import { Pagination } from "@app/components/Pagination/pagination.component";

import { Loader } from "@app/components/Loader/loader.component";
import { ErrorMesage } from "@app/components/ErrorMessage/error-mesage.component";

import styles from "./home.module.scss";
import { Search } from "@app/components/Search/search.component";
import { Filter } from "@app/components/Filter/filter.component";

export const Home = () => {
  const pokemons = useAppSelector(selectPokemonsList);
  const loadingStatus = useAppSelector(selectPokemonsLoadingStatus);
  const pokemonsType = useAppSelector(selectPokemonsType);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingStatus === "idle" && pokemons.length > 0) {
      dispatch(clearSearchResult());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons.length]);

  if (loadingStatus === "fail") {
    return (
      <div className={styles.home}>
        <ErrorMesage />
      </div>
    );
  }

  return (
    <div className={styles.home}>
      {loadingStatus === "loading" && pokemons.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Search />
          <Filter />
          <PokemonsList pokemons={pokemons} />
          {pokemonsType ? null : <Pagination />}
        </>
      )}
    </div>
  );
};
