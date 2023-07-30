import styles from './ingredient-details.module.css';
import { ingredientPropType } from "../../utils/prop-types";

export function IngredientDetails({ ingredient }) {
  return (
    <div className={`${styles.wrapper} pl-10 pr-10 pb-15`}>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />

      <h3 className='text text_type_main-medium pt-4 pb-8'>{ingredient.name}</h3>

      <ul className={styles.list}>
        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Калории,ккал</span>
          <span>{ingredient.calories}</span>
        </li>

        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Белки, г</span>
          <span>{ingredient.proteins}</span>
        </li>

        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Жиры, г</span>
          <span>{ingredient.fat}</span>
        </li>

        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Углеводы, г</span>
          <span>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired
}