import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Loader } from "../loader/loader";
import { Api } from "../../utils/burger-api";

const API_URL = 'https://norma.nomoreparties.space/api';

const api = new Api(API_URL);

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setState({...state, isLoading: true});

    api.getIngredients()
    .then((data) => {
      setState({...state, isLoading: false, data: data.data});
    })
    .catch(() => {
      setState({...state, isLoading: false, hasError: true});
    })
  }

  return (
    <>
      <div className={styles.app}>
        <Header />
        {
          (!state.isLoading && state.data.length > 0) ?
          <Main data={state.data} /> : <Loader />
        }
      </div>
    </>
  );
}

export default App;
