import styles from "./AssetChart.module.css";
import closeIcon from "../../assets/close-round-line-icon.svg";
import closeIconWhite from "../../assets/icons8-cancel.svg";
import upArrow from "../../assets/up-arrow-svgrepo-com.svg";
import downArrow from "../../assets/down-arrow-svgrepo-com.svg";
import { Fragment, useContext, useState } from "react";
import { ThemeContext } from "../../context/theme-context";
import ChartItem from "./ChartItem";
import DeleteModal from "../DeleteModal/DeleteModal";
import { createPortal } from "react-dom";

const featureFn = (change, themeCtx) => {
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const changeClasses = change > 0 ? styles.greenColor : "";
  const closeBtn = themeCtx.theme === "dark" ? closeIconWhite : closeIcon;
  const changeIcon = change > 0 ? upArrow : downArrow;

  return [themeClass, changeClasses, closeBtn, changeIcon];
};

const AssetChart = (props) => {
  const themeCtx = useContext(ThemeContext);
  const [themeClass, changeClasses, closeBtn, changeIcon] = featureFn(
    props.change,
    themeCtx
  );

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const intervalLength = twentyFourHours / 11;
  const priceData = props.priceData.map((data, i, arr) => {
    const startTime = new Date(
      now.getTime() - (arr.length - i) * intervalLength
    )
      .toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .slice(0, 5);

    return {
      id: `${startTime}`,
      price: +data,
    };
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeBtnHandler = () => {
    setDeleteModalOpen(true);
  };

  return (
    <Fragment>
      <div className={`${styles.asset} ${themeClass}`}>
        <img
          src={closeBtn}
          alt="close button"
          className={styles.close}
          onClick={closeBtnHandler}
        />
        <div className={styles.info}>
          <p className={styles.symbol}>{props.symbol}</p>
          <span className={styles.name}>{props.name}</span>
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
        <ChartItem
          priceData={priceData}
          checkPrice={checkPrice}
          change={props.change}
        />
      </div>
      {deleteModalOpen &&
        createPortal(
          <DeleteModal
            open={{ deleteModalOpen, setDeleteModalOpen }}
            id={props.uuid}
          />,
          document.querySelector("#overlays")
        )}
    </Fragment>
  );
};

const checkPrice = (price) => {
  const cleanPrice = price.toString().split(".");
  const [big, small] = cleanPrice;
  if (big > 100) return parseFloat(price.toFixed(0));
  if (big > 100 && small?.length > 4) return parseFloat(price.toFixed(2));
  if (big < 99 && small?.length > 5) return parseFloat(price.toFixed(6));
  if (small?.length > 10) return parseFloat(price.toFixed(10));
  else return price;
};

export default AssetChart;
