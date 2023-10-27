import { render, screen } from "@testing-library/react";
import { PokemonsList } from "./pokemons-list.component";
import { ListPokemon } from "@app/types/pokemons";
import { MemoryRouter } from "react-router-dom";

const pokemons: ListPokemon[] = [
  {
    name: "Pikachu",
    url: "https://test.link/pokemon/2",
    image: "https://test.link/pokemon/2.png",
    pokemonIndex: 2,
  },
  {
    name: "Pikachu2",
    url: "https://test.link/pokemon/22",
    image: "https://test.link/pokemon/22.png",
    pokemonIndex: 22,
  },
];

test("renders pokemon cards", () => {
  render(
    <MemoryRouter>
      <PokemonsList pokemons={pokemons} />
    </MemoryRouter>
  );
  const imageElements = screen.getAllByRole("img");
  const titleElements = screen.getAllByRole("heading");
  expect(imageElements).toHaveLength(2);
  expect(titleElements).toHaveLength(2);
});
