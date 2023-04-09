import { useContext, useState } from "react";
import styles from "./Assets.module.css";
import { ThemeContext } from "../../context/theme-context";
import addIcon from "../../assets/plus-icon.svg";
import SearchModal from "../SearchModal/SearchModal";
import { createPortal } from "react-dom";
import AssetContext from "../../context/asset-context";
import AssetChart from "../AssetChart/AssetChart";
const Assets = () => {
  const assetCtx = useContext(AssetContext);
  const themeCtx = useContext(ThemeContext);
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const addAssetClickHandler = () => {
    setSearchModalIsOpen(true);
  };

  return (
    <div className={`${styles["assets-container"]} ${themeClass}`}>
      <div className={styles["assets-header"]}>
        <p>Assets (Past 24 Hrs)</p>
      </div>
      <div className={styles["assets-grid"]}>
        {assetCtx.assets.map((asset) => {
          return (
            <AssetChart
              key={asset.uuid}
              name={asset.name}
              symbol={asset.symbol}
              price={+asset.price}
              priceData={asset.priceData}
              change={+asset.change}
              uuid={asset.uuid}
            />
          );
        })}
        <div
          className={`${styles["assets-add"]} ${styles["asset-item"]}`}
          onClick={addAssetClickHandler}
        >
          <img src={addIcon} alt="add icon" />
        </div>
      </div>
      {searchModalIsOpen &&
        createPortal(
          <SearchModal close={setSearchModalIsOpen} />,
          document.querySelector("#overlays")
        )}
    </div>
  );
};

export default Assets;
