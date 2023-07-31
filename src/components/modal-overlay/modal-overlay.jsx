import { memo } from "react";
import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";

function ModalOverlay({ handleClose }) {
  return (
    <div className={styles.overlay} onClick={handleClose}></div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default memo(ModalOverlay);
