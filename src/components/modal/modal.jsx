import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function Modal({ children, onClose, modalTitle }) {

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return ReactDOM.createPortal (
    (
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.content} onClick={(evt) => {
          evt.stopPropagation();
        }}>
          <header className={`${styles.header} ${modalTitle === 'Детали ингредиента' ? 'pt-10 pl-10 pr-10' : 'pt-15 pl-10 pr-10'}`}>
            {
              modalTitle && <p className='text text_type_main-large'>{modalTitle}</p>
            }
            <button className={styles.closeButton} onClick={onClose}>
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
  children: PropTypes.node,
  onClose: PropTypes.func
}