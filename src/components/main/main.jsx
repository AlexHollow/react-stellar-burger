import { memo, useState, useEffect, useCallback, useReducer, useMemo } from "react";
import styles from "./main.module.css";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

function Main({ api }) {

  const initicalCart = [];

  const [cartState, cartDispatcher] = useReducer(reducer, initicalCart);

  const [isModalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalTitle, setModalTitle] = useState();

  //Массив с id ингредиентов
  const order = useMemo(() => {
    return cartState.map((item) => {
      return item._id;
    });
  }, [cartState]);

  //Расчет итоговой суммы
  const totalPrice = useMemo(() => {
    return cartState.reduce((acc, item) => {
      const multiplier = item.type === 'bun' ? 2 : 1;

      return acc + multiplier * item.price;
    }, 0);
  }, [cartState]);

  //Редьюсер для корзины
  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        if (action.payload.type === 'bun') {
          const filterdCart = state.filter((item) => item.type !== action.payload.type);

          return [ ...filterdCart, action.payload ];
        }
        return [ ...state, action.payload ];
      case 'remove':
        return state.filter((item) => item.key !== action.payload.key);
      case 'reset':
        return initicalCart;
    }
  }

  //Обработчики модалки
  const handleModalOpen = useCallback((content, modalTitle) => {
    setModalData(content);
    setModalTitle(modalTitle);
    setModalActive(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
  }, []);

  //Отправка заказа на сервер
  function handleOrder() {
    api.postOrder(order)
      .then((res) => {
        handleModalOpen(<OrderDetails orderNum={res.order.number} />);

        cartDispatcher({ type: 'reset' });
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients handleModalOpen={handleModalOpen} cartDispatcher={cartDispatcher} />
      <BurgerConstructor ingredients={cartState} handleOrder={handleOrder} cartDispatcher={cartDispatcher} totalPrice={totalPrice} />
      {isModalActive && (
        <Modal onClose={handleModalClose} modalTitle={modalTitle}>
          {modalData}
        </Modal>)}
    </main>
  );
}

Main.propTypes = {
  api: PropTypes.object.isRequired,
}

export default memo(Main);