import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";
import type {
  ListPokemon,
  PokemonsByTypeListResponse,
  PokemonsListResponse,
} from "@app/types/pokemons";
import { httpClient } from "@app/api/httpClient";
import { POKEMON_API_POKEMON_URL } from "@app/config";
import { IndexedType } from "@app/types/types";
import { indexedPokemonToListPokemon } from "@app/utils/pokemon-utils";

type PokemonsState = Omit<PokemonsListResponse, "results"> & {
  results: ListPokemon[];
  status: "idle" | "loading" | "fail";
  selectedType: IndexedType | null;
};

const initialState: PokemonsState = {
  count: 0,
  next: POKEMON_API_POKEMON_URL,
  previous: null,
  results: [],
  selectedType: null,
  status: "idle",
};

export const fetchPokemons = createAsyncThunk(
  "fetch/pokemons",
  async (url: string) => {
    const {
      data: { results, next, previous, count },
    } = await httpClient.get<PokemonsListResponse>(url);
    const pokemons = results.map((pokemon) =>
      indexedPokemonToListPokemon(pokemon)
    );
    return {
      next,
      previous,
      count,
      results: pokemons,
    };
  }
);

export const fetchPokemonsByType = createAsyncThunk(
  "fetch/pokemonsByType",
  async (type: IndexedType) => {
    const {
      data: { pokemon },
    } = await httpClient.get<PokemonsByTypeListResponse>(type.url);
    const results = pokemon.map((pokemon) =>
      indexedPokemonToListPokemon(pokemon.pokemon)
    );
    return {
      results,
      selectedTyle: type,
    };
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
        state.selectedType = null;
        state.status = "idle";
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "fail";
      })
      .addCase(fetchPokemonsByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonsByType.fulfilled, (state, action) => {
        state.count = 0;
        state.next = POKEMON_API_POKEMON_URL;
        state.previous = null;
        state.results = action.payload.results;
        state.selectedType = action.payload.selectedTyle;
        state.status = "idle";
      })
      .addCase(fetchPokemonsByType.rejected, (state) => {
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
export const selectPokemonsType = (state: RootState) =>
  state.pokemons.selectedType;

export default pokemonsSlice.reducer;
