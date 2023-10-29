import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";
import type { DetailPokemon } from "@app/types/pokemons";
import { httpClient } from "@app/api/httpClient";
import { POKEMON_API_POKEMON_URL } from "@app/config";

type PokemonState = {
  currentPokemon: DetailPokemon | null;
  status: "idle" | "loading" | "fail";
};

export const fetchPokemon = createAsyncThunk(
  "fetch/pokemon",
  async (name: string) => {
    const { data } = await httpClient.get<DetailPokemon>(
      `${POKEMON_API_POKEMON_URL}/${name}`
    );
    return data;
  }
);

const initialState: PokemonState = {
  currentPokemon: null,
  status: "idle",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.currentPokemon = null;
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.currentPokemon = action.payload;
        state.status = "idle";
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export const selectCurrentPokemon = (state: RootState) =>
  state.pokemon.currentPokemon;
export const selectPokemonLoadingStatus = (state: RootState) =>
  state.pokemon.status;

export default pokemonSlice.reducer;
