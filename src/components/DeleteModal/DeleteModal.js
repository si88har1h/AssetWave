import styles from "./DeleteModal.module.css";
import ModalOverlay from "../UI/Overlay";
import { Fragment } from "react";
import Button from "../UI/Button";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import AssetContext from "../../context/asset-context";

const DeleteModal = (props) => {
  const themeCtx = useContext(ThemeContext);
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const assetCtx = useContext(AssetContext);

  const filteredAssets = assetCtx.assets.filter(
    (asset) => asset.uuid !== props.id
  );

  const cancelDeleteModalHandler = () => {
    props.open.setDeleteModalOpen(false);
  };
  const removeAssetHandler = () => {
    assetCtx.setAssets(filteredAssets);
    props.open.setDeleteModalOpen(false);
  };
  return (
    <Fragment>
      <div className={`${styles.delete} ${themeClass}`}>
        <h2>Delete this from portfolio?</h2>
        <Button className={styles.cancelBtn} onClick={cancelDeleteModalHandler}>
          Cancel
        </Button>
        <Button className={styles.deleteBtn} onClick={removeAssetHandler}>
          Delete
        </Button>
      </div>
      <ModalOverlay />
    </Fragment>
  );
};

export default DeleteModal;
