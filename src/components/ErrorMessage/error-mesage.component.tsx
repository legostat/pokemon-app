import styles from "./error-message.module.scss";

export const ErrorMesage = () => {
  return (
    <div className={styles.ErrorMessage}>
      <div>Oops!</div>
      <div>Something went wrong. Try again.</div>
    </div>
  );
};
