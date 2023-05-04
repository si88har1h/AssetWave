import styles from "./AssetChart.module.css";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/theme-context";
import ChartItem from "./ChartItem";
import DeleteModal from "../DeleteModal/DeleteModal";
import { createPortal } from "react-dom";
import {
  featureFn,
  checkPrice,
  dateFn,
  formattedName,
} from "../../utility/utility";

const AssetChart = (props) => {
  const themeCtx = useContext(ThemeContext);
  const [themeClass, changeClasses, closeBtn, changeIcon] = featureFn(
    props.change,
    themeCtx
  );
  const priceData = dateFn(props.priceData);
  const name = formattedName(props.name, props.symbol);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom },
    }),
  };

  const closeBtnHandler = () => {
    setDeleteModalOpen(true);
  };

  const RenderChartData = () => {
    return priceData ? (
      <ChartItem
        priceData={priceData}
        checkPrice={checkPrice}
        change={props.change}
        price={props.price}
      />
    ) : (
      <p className={styles.not}>Not Available</p>
    );
  };

  const RenderDeleteModal = () => {
    return (
      deleteModalOpen &&
      createPortal(
        <DeleteModal
          open={{ deleteModalOpen, setDeleteModalOpen }}
          id={props.uuid}
        />,
        document.querySelector("#overlays")
      )
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={itemVariants}
      custom={(props.animateAssist + 1) * 0.2}
      layoutId={props.uuid}
    >
      <div className={`${styles.asset} ${themeClass}`}>
        <img
          src={closeBtn}
          alt="close button"
          className={styles.close}
          onClick={closeBtnHandler}
        />
        <div className={styles.info}>
          <p className={styles.symbol}>{props.symbol}</p>
          <span className={styles.name}>{name}</span>
          <hr className={styles.divider} />
          <div className={styles.flex}>
            <p className={styles.price}>{checkPrice(props.price)} $</p>
            <div className={styles.change}>
              <img src={changeIcon} alt="up arrow" />
              <p className={`${styles.changeNumber} ${changeClasses}`}>
                {props.change.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
        <RenderChartData />
      </div>
      <RenderDeleteModal />
    </motion.div>
  );
};

export default AssetChart;
