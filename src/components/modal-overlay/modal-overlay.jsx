import { memo } from "react";
import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";

function ModalOverlay({ modalDispatcher }) {
  return (
    <div className={styles.overlay} onClick={() => modalDispatcher({ type: 'close' })}></div>
  );
}

ModalOverlay.propTypes = {
  modalDispatcher: PropTypes.func.isRequired
}

export default memo(ModalOverlay);
