import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { selectResult, findPokemons } from "@app/store/features/searchSlice";

import { useDebounce } from "@app/hooks/useDebounce";

import styles from "./search.module.scss";
import { Link } from "react-router-dom";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const result = useAppSelector(selectResult);

  const debouncedSearch = useDebounce((value) => {
    dispatch(findPokemons(value));
  }, 300);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.Search__container}>
      <form className={styles.Search__form}>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={searchTerm}
            placeholder="Search for a Pokemon..."
          />
        </div>
        {result.length > 0 ? (
          <ul className={styles.Search__result}>
            {result.map((pokemon) => (
              <Link className={styles.result_link} to={`pokemon/${pokemon}`}>
                {pokemon}
              </Link>
            ))}
          </ul>
        ) : null}
      </form>
    </div>
  );
};
