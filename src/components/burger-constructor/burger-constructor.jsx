import { memo } from 'react';
import styles from "./burger-constructor.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data, handleOrder, cartDispatcher, totalPrice }) {

  // const { bun, ingredients } = useMemo(() => {
  //   return {
  //     bun: data.find(item => item.type === 'bun'),
  //     ingredients: data.filter(item => item.type !== 'bun'),
  //   };
  // }, [data]);
  
  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <div className={styles.container}>
        {
          !data.bun ? '' :
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${data.bun.name} (верх)`}
              price={data.bun.price}
              thumbnail={data.bun.image}
              extraClass="ml-8"
            />  
        }

        <ul className={`${styles.list} custom-scroll`}>
          {
            data.ingredients.map((item) => {
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
          !data.bun ? '' :
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${data.bun.name} (низ)`}
              price={data.bun.price}
              thumbnail={data.bun.image}
              extraClass="ml-8"
            />
        }
      </div>

      <div className={`${styles.totalContainer} pr-4`}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon />
        </div>
        <Button disabled={data.ingredients.length <= 0 || !data.bun ? true : false}
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrder}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.shape({
    bun: ingredientPropType,
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
  }).isRequired,
  handleOrder: PropTypes.func.isRequired,
  cartDispatcher: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
}


export default memo(BurgerConstructor);