import { memo, useState, useMemo, useEffect } from 'react';
import styles from "./burger-ingredients.module.css";
import BurgerCard from "./burger-ingredients-card/burger-ingredients-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { openModal } from '../../services/actions/modalActions';

function BurgerIngredients() {

  const data = useSelector(state => state.ingredients.ingredients);
  const dispatch = useDispatch();

  const [bunsRef, bunsInView] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0 });
  const [fillingsRef, fillingsInView] = useInView({ threshold: 0 });

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

  useEffect(() => {
    if (bunsInView) {
      setType("buns");
    } else if (saucesInView) {
      setType("sauces");
    } else if (fillingsInView) {
      setType("fillings");
    }
  }, [bunsInView, saucesInView, fillingsInView]);

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
        <ul ref={bunsRef} id="buns" className={`${styles.list} pl-4 pr-4 mb-10`}>
          {buns.map((item) => {
            return (
              <li key={item._id} onClick={() => dispatch(openModal({ content: item, title: 'Детали ингредиента' }))}>
                <BurgerCard
                  ingredient={item}
                />
              </li>
            )
          })}
        </ul>

        <h3 className="text text_type_main-medium mb-6">Соусы</h3>
        <ul ref={saucesRef} id="sauces" className={`${styles.list} pl-4 pr-4 mb-10`}>
          {sauces.map((item) => {
            return (
              <li key={item._id} onClick={() => dispatch(openModal({ content: item, title: 'Детали ингредиента' }))}>
                <BurgerCard
                  ingredient={item}
                />
              </li>
            )
          })}
        </ul>

        <h3 className="text text_type_main-medium mb-6">Начинки</h3>
        <ul ref={fillingsRef} id="fillings" className={`${styles.list} pl-4 pr-4 mb-10`}>
          {mains.map((item) => {
            return (
              <li key={item._id} onClick={() => dispatch(openModal({ content: item, title: 'Детали ингредиента' }))}>
                <BurgerCard
                  ingredient={item}
                />
              </li>
            )
          })}
        </ul>
      </div>

    </section>
  );
}

export default memo(BurgerIngredients);