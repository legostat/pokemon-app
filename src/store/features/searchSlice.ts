import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";
import type { PokemonsListResponse } from "@app/types/pokemons";
import { httpClient } from "@app/api/httpClient";
import { POKEMON_API_POKEMON_URL } from "@app/config";

type SearchState = {
  allPokemons: string[];
  searchResult: string[];
  status: "idle" | "loading" | "fail";
};

const initialState: SearchState = {
  allPokemons: [],
  searchResult: [],
  status: "idle",
};

export const fetchAllPokemons = createAsyncThunk(
  "fetch/all-pokemons",
  async (limit: number) => {
    const {
      data: { results },
    } = await httpClient.get<PokemonsListResponse>(
      `${POKEMON_API_POKEMON_URL}?offset=0&limit=${limit}`
    );
    const result = results.map((pokemon) => pokemon.name);
    return result;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.searchResult = [];
    },
    findPokemons: (state, action) => {
      const result =
        action.payload === ""
          ? []
          : state.allPokemons.filter((pokemon) =>
              pokemon.includes(action.payload)
            );
      state.searchResult = result;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPokemons.fulfilled, (state, action) => {
        state.allPokemons = action.payload;
      })
      .addCase(fetchAllPokemons.rejected, (state) => {
        state.status = "fail";
      }),
});

export const { findPokemons, clearSearchResult } = searchSlice.actions;

export const selectResult = (state: RootState) => state.search.searchResult;

export default searchSlice.reducer;
