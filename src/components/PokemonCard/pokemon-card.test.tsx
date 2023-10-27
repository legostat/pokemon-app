import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PokemonCard } from "./pokemon-card.component";
import { ListPokemon } from "../../types/pokemons";

const pokemon: ListPokemon = {
  name: "Pikachu",
  url: "https://test.link/pokemon/2",
  image: "https://test.link/pokemon/2.png",
  pokemonIndex: 2,
};

test("renders card image", () => {
  render(
    <MemoryRouter>
      <PokemonCard pokemon={pokemon} />
    </MemoryRouter>
  );
  const imageElement = screen.getByRole("img");
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("src", pokemon.image);
  expect(imageElement).toHaveAttribute("alt", pokemon.name);
});

test("renders card title", () => {
  render(
    <MemoryRouter>
      <PokemonCard pokemon={pokemon} />
    </MemoryRouter>
  );
  const titleElement = screen.getByRole("heading");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent(pokemon.name);
});

// test("has a link to a personal page", () => {
//   render(<PokemonCard pokemon={pokemon} />);
//   const linkElement = screen.getByRole("link");
//   expect(linkElement).toBeInTheDocument();
// });
