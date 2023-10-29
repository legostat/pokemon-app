import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import styles from "./pagination.module.scss";
import {
  selectNexlUrl,
  selecPreviousUrl,
  fetchPokemons,
} from "@app/store/features/pokemonsSlice";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const nextUrl = useAppSelector(selectNexlUrl);
  const previousUrl = useAppSelector(selecPreviousUrl);

  const handleClickNext = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nextUrl) {
      dispatch(fetchPokemons(nextUrl));
    }
  };

  const handleClickPrevious = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previousUrl) {
      dispatch(fetchPokemons(previousUrl));
    }
  };

  return (
    <div className={styles.Pagination}>
      <button
        onClick={handleClickPrevious}
        className={styles.Pagination__btn}
        disabled={!previousUrl}
      >
        Previous
      </button>
      <button
        onClick={handleClickNext}
        className={styles.Pagination__btn}
        disabled={!nextUrl}
      >
        Next
      </button>
    </div>
  );
};
