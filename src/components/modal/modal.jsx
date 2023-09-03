import { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/actions/modalActions";

function Modal({ children }) {

  const dispatch = useDispatch();
  const modalInfo = useSelector(state => state.modal);

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        dispatch(closeModal());
      }
    };

    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [dispatch]);

  return ReactDOM.createPortal (
    (
      <div className={styles.modal}>
        <ModalOverlay />

        <div className={styles.content}>
          <header className={`${styles.header} ${modalInfo.title === 'Детали ингредиента' ? 'pt-10 pl-10 pr-10' : 'pt-15 pl-10 pr-10'}`}>
            {
              modalInfo.title && <p className='text text_type_main-large'>{modalInfo.title}</p>
            }
            <button className={styles.closeButton} onClick={() => dispatch(closeModal())}>
              <CloseIcon type="primary" />
            </button>
          </header>
          
          {children}
        </div>
      </div>
    ), document.getElementById("root-modal")
  );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default memo(Modal);