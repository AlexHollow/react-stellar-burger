import { memo } from 'react';
import styles from "./burger-ingredients-card.module.css";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCard({ name, price, image }) {
  return (
    <div className={styles.card}>
      <Counter count={1} size="default" />
      <img className={`${styles.image} pl-4 pr-4`} src={image} alt={name} />
      <div className={styles.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon />
      </div>
      <h3 className="text text_type_main-default">{name}</h3>
    </div>
  )
}

BurgerCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default memo(BurgerCard);