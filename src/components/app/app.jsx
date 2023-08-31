import styles from "./app.module.css";
import { useEffect } from "react";
import { Header } from "../header/header";
import Main from "../main/main";
import { Loader } from "../loader/loader";
import { fetchIngredients } from "../../services/actions/ingredientsActions";
import { useSelector, useDispatch } from "react-redux";

function App() {

  const { ingredients, isLoading } = useSelector(state => state.ingredients);
  const orderIsLoading = useSelector(state => state.order.isLoading);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <Header />
        {
          (!isLoading && ingredients.length > 0 && !orderIsLoading) ? <Main /> : <Loader />
        }
      </div>
    </>
  );
}

export default App;
