import { memo, useMemo } from 'react';
import styles from "./burger-constructor.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ ingredients, handleOrder, cartDispatcher, totalPrice }) {

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients]);

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <div className={styles.container}>
        {
          buns.map((item) => {
            return (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
                extraClass="ml-8"
                key={item.key}
              />
            )
          })
        }

        <ul className={`${styles.list} custom-scroll`}>
          {
            mains.map((item) => {
              return (
                <li key={item.key} className={styles.listItem}>
                  <div className={styles.dragIcon}>
                    <DragIcon />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => cartDispatcher({ type: 'remove', payload: item })}
                  />
                </li>
              )
            })
          }
        </ul>

        {
          buns.map((item) => {
            return (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${item.name} (низ)`}
                price={item.price}
                thumbnail={item.image}
                extraClass="ml-8"
                key={item.key}
              />
            )
          })
        }
      </div>

      <div className={`${styles.totalContainer} pr-4`}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon />
        </div>
        <Button disabled={ingredients.length <= 0 ? true : false}
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrder}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  handleOrder: PropTypes.func.isRequired,
  cartDispatcher: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
}


export default memo(BurgerConstructor);