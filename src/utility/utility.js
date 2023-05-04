import closeIcon from "../assets/close-round-line-icon.svg";
import closeIconWhite from "../assets/icons8-cancel.svg";
import upArrow from "../assets/up-arrow-svgrepo-com.svg";
import downArrow from "../assets/down-arrow-svgrepo-com.svg";
import styles from "../components/AssetChart/AssetChart.module.css";

export const featureFn = (change, themeCtx) => {
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const changeClasses = change > 0 ? styles.greenColor : "";
  const closeBtn = themeCtx.theme === "dark" ? closeIconWhite : closeIcon;
  const changeIcon = change > 0 ? upArrow : downArrow;

  return [themeClass, changeClasses, closeBtn, changeIcon];
};

export const checkPrice = (price, type = "main") => {
  const mainMax = 11;
  const tickMax = 20;
  if (type === "main") {
    if (price.toString().length >= mainMax) {
      return price.toString().substring(0, mainMax);
    } else {
      return price;
    }
  }
  if (type === "tick") {
    if (!price.toString().includes("e")) {
      if (price.toString().length >= tickMax) {
        return price.toString().substring(0, tickMax);
      } else {
        return price;
      }
    } else {
      return price.toFixed(20).toString().substring(0, 10);
    }
  }
  if (type === "tooltip") {
    if (price.toString().includes("e")) {
      return price.toFixed(20).toString().substring(0, 12);
    } else return price;
  }
};

export const dateFn = (sparkline) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const intervalLength = twentyFourHours / 11;
  if (sparkline.length === 0) return null;

  const priceData = sparkline.map((data, i, arr) => {
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

  return priceData;
};

export const formattedName = (name, symbol) => {
  if (symbol.concat(name).length > 15) {
    if (symbol.length >= 6) {
      return name.substring(0, 7) + " ...";
    } else return name.substring(0, 15) + " ...";
  } else return name;
};
