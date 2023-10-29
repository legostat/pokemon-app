import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import {
  selectPokemonLoadingStatus,
  selectCurrentPokemon,
  fetchPokemon,
} from "@app/store/features/pokemonSlice";
import { PokemonDetail } from "@app/components/PokemonDetail/pokemon-detail.component";

import styles from "./detail.module.scss";
import { useEffect } from "react";
import { Loader } from "@app/components/Loader/loader.component";
import { ErrorMesage } from "@app/components/ErrorMessage/error-mesage.component";

export const Detail = () => {
  const dispatch = useAppDispatch();
  const { pokemonName } = useParams();
  const pokemon = useAppSelector(selectCurrentPokemon);
  const loadingStatus = useAppSelector(selectPokemonLoadingStatus);
  useEffect(() => {
    if (pokemonName) {
      dispatch(fetchPokemon(pokemonName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonName]);

  if (loadingStatus === "fail") {
    return (
      <div className={styles.detail}>
        <ErrorMesage />
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      {loadingStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          {pokemon ? <PokemonDetail pokemon={pokemon} /> : null}
          <div className={styles.detail__btn__wrapper}>
            <Link className={styles.detail__btn} to="/">
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
