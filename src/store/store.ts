import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "@app/store/features/pokemonsSlice";
import pokemonReducer from "@app/store/features/pokemonSlice";
import searchReducer from "@app/store/features/searchSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
