import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";
import type { PokemonsListResponse } from "@app/types/pokemons";
import { POKEMON_API_POKEMON_URL } from "@app/config";
import { httpClient } from "@app/api/httpClient";
type PokemonsState = PokemonsListResponse & {
  status: "idle" | "loading" | "fail";
};

const initialState: PokemonsState = {
  count: 0,
  next: POKEMON_API_POKEMON_URL,
  previuos: null,
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
        state.previuos = action.payload.previuos;
        state.results = action.payload.results;
        state.status = "idle";
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export const selectNexlUrl = (state: RootState) => state.pokemons.next;
export const selecPpreviuosUrl = (state: RootState) => state.pokemons.previuos;
export const selectPokemonsList = (state: RootState) =>
  state.pokemons.results ? state.pokemons.results : [];
export const selectPokemonsCount = (state: RootState) => state.pokemons.count;

export default pokemonsSlice.reducer;
