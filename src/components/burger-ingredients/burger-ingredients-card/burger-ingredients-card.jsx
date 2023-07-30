import styles from "./burger-ingredients-card.module.css";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerCard(props) {
  return (
    <div className={styles.card}>
      <Counter count={1} size="default" />
      <img className={`${styles.image} pl-4 pr-4`} src={props.image} alt={props.name} />
      <div className={styles.price}>
        <span className="text text_type_digits-default">{props.price}</span>
        <CurrencyIcon />
      </div>
      <h3 className="text text_type_main-default">{props.name}</h3>
    </div>
  )
}

BurgerCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}