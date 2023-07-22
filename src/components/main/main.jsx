import React from "react";
import styles from "./main.module.css";

import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

export function Main(props) {

  const data = props.data;

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}
