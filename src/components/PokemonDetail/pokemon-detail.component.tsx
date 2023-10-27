import { useParams } from "react-router-dom";
import styles from "./pokemon-detail.module.scss";
import { usePokemon } from "@app/hooks/usePokemon";

export const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const { pokemon, isLoading } = usePokemon({ pokemonName });

  return <div>{JSON.stringify(pokemon?.abilities)} </div>;
};
