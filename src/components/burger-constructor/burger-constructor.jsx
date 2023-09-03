import { memo, useMemo, useRef } from 'react';
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, resetCart } from '../../services/actions/cartActions';
import { fetchOrder } from '../../services/actions/orderActions';
import { openModal } from '../../services/actions/modalActions';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from '../order-details/order-details';
import BurgerConstructorCard from '../burger-constructor/burger-constructor-card/burger-constructor-card';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {

  const cartState = useSelector(state => state.cart);
  const modalInfo = useSelector(state => state.modal);

  const dispatch = useDispatch();

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }) {
      dispatch(addIngredient({ ...ingredient, key: uuidv4() }))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  //Расчет итоговой суммы
  const totalPrice = useMemo(() => {
    const ingredientTotalPrice =  cartState.ingredients.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    return !cartState.bun ? ingredientTotalPrice : ingredientTotalPrice + cartState.bun.price * 2;
  }, [cartState]);

  //Массив с id ингредиентов
  const order = useMemo(() => {
    const currentIngredients = cartState.ingredients.map((item) => {
      return item._id;
    });

    return !cartState.bun ? [...currentIngredients] : [cartState.bun._id, ...currentIngredients, cartState.bun._id];
  }, [cartState]);

  //Отправка заказа на сервер
  function handleOrder() {
    dispatch(fetchOrder(order, () => {
      dispatch(openModal(' ', ' '));
      dispatch(resetCart());
    }));
  }
  
  return (
    <section className={`${styles.section} ${isHover && styles.sectionOnDrop} pt-25 pl-4`} ref={dropTargetRef}>

      <div className={styles.container}>
        {
          !cartState.bun ? '' :
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${cartState.bun.name} (верх)`}
              price={cartState.bun.price}
              thumbnail={cartState.bun.image}
              extraClass="ml-8"
            />
        }

        <ul className={`${styles.list} custom-scroll`}>
          {
            cartState.ingredients.map((item, index) => {
              return (
                <BurgerConstructorCard key={item.key} item={item} id={item.id} index={index} />
              )
            })
          }
        </ul>

        {
          !cartState.bun ? '' :
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${cartState.bun.name} (низ)`}
              price={cartState.bun.price}
              thumbnail={cartState.bun.image}
              extraClass="ml-8"
            />
        }
      </div>

      <div className={`${styles.totalContainer} pr-4`}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon />
        </div>
        <Button disabled={cartState.ingredients.length <= 0 || !cartState.bun ? true : false}
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrder}>Оформить заказ</Button>
      </div>

      {
        modalInfo.isActive &&
        <Modal>
          {
            modalInfo.title === 'Детали ингредиента' ? <IngredientDetails ingredient={modalInfo.content} /> : <OrderDetails />
          }
        </Modal>
      }
      
    </section>
  )
}

export default memo(BurgerConstructor);