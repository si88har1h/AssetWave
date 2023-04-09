import styles from "./Overlay.module.css";
const ModalOverlay = (props) => {
  const overlayCloseHandler = () => props.onClick(false);
  return <div className={styles.overlay} onClick={overlayCloseHandler}></div>;
};

export default ModalOverlay;
