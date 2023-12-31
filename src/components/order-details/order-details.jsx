import { memo } from 'react';
import styles from './order-details.module.css';
import doneImage from '../../images/done.jpg';
import { useSelector } from 'react-redux';

function OrderDetails() {

  const orderNum = useSelector(state => state.order.orderNum);

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.orderNum} text text_type_digits-large`}>{orderNum}</p>
      <p className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</p>
      <img src={doneImage} alt="done" />
      <p className="text text_type_main-default pt-15 pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default memo(OrderDetails);