import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContainer}></div>
      <p className={`text text_type_main-large ${styles.loaderText}`}>Загрузка</p>
    </div>
  );
}
