import { PokemonDetail } from "@app/components/PokemonDetail/pokemon-detail.component";
import styles from "./detail.module.scss";

export const Detail = () => {
  return (
    <div className={styles.detail}>
      <PokemonDetail />
    </div>
  );
};
