import { SpinnerCircular } from "spinners-react";
import styles from "./loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.Loader}>
      <SpinnerCircular
        size={190}
        thickness={100}
        speed={100}
        color="rgba(100, 172, 57, 1)"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    </div>
  );
};
