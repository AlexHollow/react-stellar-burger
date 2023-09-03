import { memo, useRef } from 'react';
import styles from "./burger-constructor-card.module.css";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredient, shiftIngredient } from '../../../services/actions/cartActions';
import { useDrag, useDrop } from "react-dnd";

function BurgerConstructorCard({ item, id, index }) {

  const cartIngredients = useSelector(state => state.cart.ingredients);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const dragCard = cartIngredients[dragIndex];
      const cart = [...cartIngredients];

      cart.splice(dragIndex, 1);
      cart.splice(hoverIndex, 0, dragCard);
      
      dispatch(shiftIngredient(cart));

      item.index = hoverIndex;
    },
  })

  drag(drop(ref))

  return (
    <li className={`${styles.listItem} ${isDragging && styles.listItemDrop}`} ref={ref}>
      <div className={styles.dragIcon}>
        <DragIcon />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(removeIngredient(item))}
      />
    </li>
  )
}

BurgerConstructorCard.propTypes = {
  item: ingredientPropType.isRequired,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
}


export default memo(BurgerConstructorCard);