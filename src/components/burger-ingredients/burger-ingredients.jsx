import { memo, useState, useMemo } from 'react';
import styles from "./burger-ingredients.module.css";
import BurgerCard from "./burger-ingredients-card/burger-ingredients-card";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients({ data, handleModalOpen }) {

  const [type, setType] = useState('buns');

  const buns = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
  const mains = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
  const sauces = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);

  function handleScroll(evt) {
    document.getElementById(`${evt}`).scrollIntoView({ behavior: "smooth", block: "start"});
  }

  function handleTabChange(evt) {
    setType(evt);
    handleScroll(evt);
  }
  
  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>

      <div className={`${styles.tabs} mb-10`}>
        <Tab value="buns" active={type === 'buns'} onClick={handleTabChange}>Булки</Tab>
        <Tab value="sauces" active={type === 'sauces'} onClick={handleTabChange}>Соусы</Tab>
        <Tab value="fillings" active={type === 'fillings'} onClick={handleTabChange}>Начинки</Tab>
      </div>

      <div className={`${styles.container} custom-scroll`}>
        <h3 className="text text_type_main-medium mb-6">Булки</h3>
        <ul id="buns" className={`${styles.list} pl-4 pr-4 mb-10`}>
          {buns.map((item) => {
            return (
              <li key={item._id} onClick={() => handleModalOpen(<IngredientDetails ingredient={item} />, 'Детали ингредиента')}>
                <BurgerCard image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </li>
            )
          })}
        </ul>

        <h3 className="text text_type_main-medium mb-6">Соусы</h3>
        <ul id="sauces" className={`${styles.list} pl-4 pr-4 mb-10`}>
          {sauces.map((item) => {
            return (
              <li key={item._id} onClick={() => handleModalOpen(<IngredientDetails ingredient={item} />, 'Детали ингредиента')}>
                <BurgerCard image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </li>
            )
          })}
        </ul>

        <h3 className="text text_type_main-medium mb-6">Начинки</h3>
        <ul id="fillings" className={`${styles.list} pl-4 pr-4 mb-10`}>
          {mains.map((item) => {
            return (
              <li key={item._id} onClick={() => handleModalOpen(<IngredientDetails ingredient={item} />, 'Детали ингредиента')}>
                <BurgerCard image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </li>
            )
          })}
        </ul>
      </div>

    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  handleModalOpen: PropTypes.func.isRequired,
};


export default memo(BurgerIngredients);