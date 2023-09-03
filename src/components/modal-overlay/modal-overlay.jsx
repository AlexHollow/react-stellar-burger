import { memo } from "react";
import styles from "./modal-overlay.module.css"
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/actions/modalActions";

function ModalOverlay() {

  const dispatch = useDispatch();

  return (
    <div className={styles.overlay} onClick={() => dispatch(closeModal())}></div>
  );
}

export default memo(ModalOverlay);
