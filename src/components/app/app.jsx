import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Loader } from "../loader/loader";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    getData(apiUrl);
  }, []);

  function getData(url) {
    setState({...state, isLoading: true});

    fetch(url)
    .then(res => {
      if (res.ok ) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
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
