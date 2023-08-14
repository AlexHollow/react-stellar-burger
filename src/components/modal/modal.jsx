import { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ children, modalDispatcher, modalTitle }) {

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        modalDispatcher({ type: 'close' });
      }
    };

    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [modalDispatcher]);

  return ReactDOM.createPortal (
    (
      <div className={styles.modal}>
        <ModalOverlay modalDispatcher={modalDispatcher} />

        <div className={styles.content}>
          <header className={`${styles.header} ${modalTitle === 'Детали ингредиента' ? 'pt-10 pl-10 pr-10' : 'pt-15 pl-10 pr-10'}`}>
            {
              modalTitle && <p className='text text_type_main-large'>{modalTitle}</p>
            }
            <button className={styles.closeButton} onClick={() => modalDispatcher({ type: 'close' })}>
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
  modalDispatcher: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
}

export default memo(Modal);