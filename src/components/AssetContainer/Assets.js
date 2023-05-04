import { useContext, useState } from "react";
import styles from "./Assets.module.css";
import { ThemeContext } from "../../context/theme-context";
import addIcon from "../../assets/plus-icon.svg";
import SearchModal from "../SearchModal/SearchModal";
import { createPortal } from "react-dom";
import AssetContext from "../../context/asset-context";
import AssetChart from "../AssetChart/AssetChart";
import { AnimatePresence, motion } from "framer-motion";

const Assets = () => {
  const assetCtx = useContext(AssetContext);
  const themeCtx = useContext(ThemeContext);
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const addAssetClickHandler = () => {
    setSearchModalIsOpen(true);
  };

  const animatedAssets = (
    <AnimatePresence>
      {assetCtx.assets.map((asset, i) => {
        return (
          <AssetChart
            key={asset.uuid}
            name={asset.name}
            symbol={asset.symbol}
            price={+asset.price}
            priceData={asset.priceData}
            change={+asset.change}
            uuid={asset.uuid}
            animateAssist={i}
          />
        );
      })}
    </AnimatePresence>
  );

  const addAssets = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${styles["assets-add"]} ${styles["asset-item"]}`}
      whileHover={{ scale: 1.02 }}
      onClick={addAssetClickHandler}
    >
      <img src={addIcon} alt="add icon" />
    </motion.div>
  );

  return (
    <div className={`${styles["assets-container"]} ${themeClass}`}>
      <div className={styles["assets-header"]}>
        <p>Crypto</p>
      </div>
      <div className={styles["assets-grid"]}>
        {animatedAssets}
        {addAssets}
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
