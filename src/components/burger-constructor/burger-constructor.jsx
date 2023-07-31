import { memo, useMemo } from 'react';
import styles from "./burger-constructor.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data, handleModalOpen }) {

  const buns = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
  const mains = useMemo(() => data.filter((item) => item.type !== 'bun'), [data]);

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
                key={item._id}
              />
            )
          })
        }

        <ul className={`${styles.list} custom-scroll`}>
          {
            mains.map((item) => {
              return (
                <li key={item._id} className={styles.listItem}>
                  <div className={styles.dragIcon}>
                    <DragIcon />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
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
                key={item._id}
              />
            )
          })
        }
      </div>

      <div className={`${styles.totalContainer} pr-4`}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">0</span>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => {handleModalOpen(<OrderDetails />)}}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  handleModalOpen: PropTypes.func.isRequired,
}


export default memo(BurgerConstructor);