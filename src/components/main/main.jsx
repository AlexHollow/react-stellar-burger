import { useState, useCallback } from "react";
import styles from "./main.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Modal } from "../modal/modal";

export function Main({ data }) {

  const ingredients = data;

  const [cart, setCart] = useState([
    {
      "_id": "60666c42cc7b410027a1a9b1",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0
    },
    {
      "_id": "60666c42cc7b410027a1a9b5",
      "name": "Говяжий метеорит (отбивная)",
      "type": "main",
      "proteins": 800,
      "fat": 800,
      "carbohydrates": 300,
      "calories": 2674,
      "price": 3000,
      "image": "https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v": 0
    },
    {
      "_id": "60666c42cc7b410027a1a9b6",
      "name": "Биокотлета из марсианской Магнолии",
      "type": "main",
      "proteins": 420,
      "fat": 142,
      "carbohydrates": 242,
      "calories": 4242,
      "price": 424,
      "image": "https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
      "__v": 0
    },
    {
      "_id": "60666c42cc7b410027a1a9b7",
      "name": "Соус Spicy-X",
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v": 0
    },
    {
      "_id": "60666c42cc7b410027a1a9b4",
      "name": "Мясо бессмертных моллюсков Protostomia",
      "type": "main",
      "proteins": 433,
      "fat": 244,
      "carbohydrates": 33,
      "calories": 420,
      "price": 1337,
      "image": "https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v": 0
    },
    {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9b8",
      "name":"Соус фирменный Space Sauce",
      "type":"sauce",
      "proteins":50,
      "fat":22,
      "carbohydrates":11,
      "calories":14,
      "price":80,
      "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bb",
      "name":"Хрустящие минеральные кольца",
      "type":"main",
      "proteins":808,
      "fat":689,
      "carbohydrates":609,
      "calories":986,
      "price":300,
      "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      "__v":0
   },
  ]);

  const [isModalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalTitle, setModalTitle] = useState();

  const handleModalOpen = useCallback((content, modalTitle) => {
    setModalData(content);
    setModalTitle(modalTitle);
    setModalActive(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalActive(false);
  }, []);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients data={ingredients} handleModalOpen={handleModalOpen} />
      <BurgerConstructor data={cart} handleModalOpen={handleModalOpen} />
      {isModalActive && (
        <Modal onClose={handleModalClose} modalTitle={modalTitle}>
          {modalData}
        </Modal>)}
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};