import { memo, useReducer, useMemo } from "react";
import styles from "./main.module.css";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

function Main({ api }) {

  const initialCart = {
    bun: null,
    ingredients: [],
  };

  const initialModal = {
    isActive: false,
    data: null,
    title: null,
  }

  const [cartState, cartDispatcher] = useReducer(cartReducer, initialCart);

  const [modalState, modalDispatcher] = useReducer(modalReducer, initialModal);

  // const [isModalActive, setModalActive] = useState(false);
  // const [modalData, setModalData] = useState();
  // const [modalTitle, setModalTitle] = useState();

  //Редьюсер для корзины
  function cartReducer(state, action) {
    switch (action.type) {
      case 'add':
        if (action.payload.type === 'bun') {
          return { bun: action.payload, ingredients: state.ingredients }
        }
        return { bun: state.bun, ingredients: state.ingredients.concat(action.payload) }
      case 'remove':
        return { bun: state.bun, ingredients: state.ingredients.filter((item) => item.key !== action.payload.key) }
      case 'reset':
        return initialCart;
      default:
    }
  }

  //Редьюсер для модалки
  function modalReducer(state, action) {
    switch (action.type) {
      case 'open':
        return { isActive: true, data: action.payload.content, title: action.payload.title }
      case 'close':
        return initialModal;
      default: 
    }
  }

  //Массив с id ингредиентов
  const order = useMemo(() => {
    const currentIngredients = cartState.ingredients.map((item) => {
      return item._id;
    });

    return !cartState.bun ? [...currentIngredients] : [cartState.bun._id, ...currentIngredients, cartState.bun._id];
  }, [cartState]);

  //Расчет итоговой суммы
  const totalPrice = useMemo(() => {
    const ingredientTotalPrice =  cartState.ingredients.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    return !cartState.bun ? ingredientTotalPrice : ingredientTotalPrice + cartState.bun.price * 2;
  }, [cartState]);

  //Обработчики модалки
  // const handleModalOpen = useCallback((content, modalTitle) => {
  //   setModalData(content);
  //   setModalTitle(modalTitle);
  //   setModalActive(true);
  // }, []);

  // const handleModalClose = useCallback(() => {
  //   setModalActive(false);
  // }, []);

  //Отправка заказа на сервер
  function handleOrder() {
    api.postOrder(order)
      .then((res) => {
        modalDispatcher({ type: 'open', payload: { content: <OrderDetails orderNum={res.order.number} /> }});
        // handleModalOpen(<OrderDetails orderNum={res.order.number} />);
        cartDispatcher({ type: 'reset' });
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients modalDispatcher={modalDispatcher} cartDispatcher={cartDispatcher} />
      <BurgerConstructor data={cartState} handleOrder={handleOrder} cartDispatcher={cartDispatcher} totalPrice={totalPrice} />
      {modalState.isActive && (
        <Modal modalDispatcher={modalDispatcher} modalTitle={modalState.title}>
          {modalState.data}
        </Modal>)}
    </main>
  );
}

Main.propTypes = {
  api: PropTypes.object.isRequired,
}

export default memo(Main);