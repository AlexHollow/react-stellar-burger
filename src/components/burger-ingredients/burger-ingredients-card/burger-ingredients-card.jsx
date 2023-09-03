import { memo, useMemo } from 'react';
import styles from "./burger-ingredients-card.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";

function BurgerCard({ ingredient }) {

  const cartState = useSelector(state => state.cart);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  
  const count = useMemo(() => {
    const allIngredients = [ cartState.bun, ...cartState.ingredients, cartState.bun ];
    
    return allIngredients.filter((item) => item._id === ingredient._id).length;
  }, [cartState]);

  return (
    <div className={`${styles.card} ${isDrag && styles.cardIsDragging}`} ref={dragRef}>
      {
        count === 0 ? '' : <Counter count={count} size="default" />
      }
      <img className={`${styles.image} pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon />
      </div>
      <h3 className="text text_type_main-default">{ingredient.name}</h3>
    </div>
  )
}

BurgerCard.propTypes = {
  ingredient: ingredientPropType.isRequired
}

export default memo(BurgerCard);