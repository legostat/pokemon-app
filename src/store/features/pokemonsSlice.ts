import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";
import type { PokemonsListResponse } from "@app/types/pokemons";
import { httpClient } from "@app/api/httpClient";
import { POKEMON_API_POKEMON_URL } from "@app/config";

type PokemonsState = PokemonsListResponse & {
  status: "idle" | "loading" | "fail";
};

const initialState: PokemonsState = {
  count: 0,
  next: POKEMON_API_POKEMON_URL,
  previous: null,
  results: [],
  status: "idle",
};

export const fetchPokemons = createAsyncThunk(
  "fetch/pokemons",
  async (url: string) => {
    const { data } = await httpClient.get<PokemonsListResponse>(url);
    return data;
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.results = action.payload.results;
        state.status = "idle";
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export const selectNexlUrl = (state: RootState) => state.pokemons.next;
export const selecPreviousUrl = (state: RootState) => state.pokemons.previous;
export const selectPokemonsList = (state: RootState) =>
  state.pokemons.results ? state.pokemons.results : [];
export const selectPokemonsCount = (state: RootState) => state.pokemons.count;
export const selectPokemonsLoadingStatus = (state: RootState) =>
  state.pokemons.status;

export default pokemonsSlice.reducer;
