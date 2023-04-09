import styles from "./SearchSuggestion.module.css";
import moreThan from "../../assets/more-than.svg";
import { useContext } from "react";
import AssetContext from "../../context/asset-context";
import { ThemeContext } from "../../context/theme-context";

const SearchSuggestion = (props) => {
  const themeCtx = useContext(ThemeContext);
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const assetCtx = useContext(AssetContext);

  const assetClickHandler = async () => {
    const options = {
      headers: {
        "x-access-token":
          "coinranking68ec3e7515f45e2bb333b1d8ae8ebf80a9c1fb3b14c109b3",
      },
    };

    try {
      const response = await fetch(
        `https://api.coinranking.com/v2/coin/${props.uuid}?timePeriod=24h`,
        options
      );
      const data = await response.json();
      if (assetCtx.assets.find((asset) => asset.uuid === data.data.coin.uuid)) {
        props.duplicate(true);
        return;
      }
      const assetData = data.data.coin;
      const assetItem = {
        uuid: assetData.uuid,
        symbol: assetData.symbol,
        name: assetData.name,
        price: assetData.price,
        priceData: assetData.sparkline,
        change: assetData.change,
      };
      assetCtx.setAssets((prevState) => [...prevState, assetItem]);
      props.close(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li
      className={`${styles.suggestion} ${themeClass}`}
      onClick={assetClickHandler}
    >
      <div className={styles.info}>
        <span className={styles.symbol}>{props.symbol}</span>
        <span className={styles.name}>{props.name}</span>
      </div>
      <img src={moreThan} alt="more than logo" />
    </li>
  );
};

export default SearchSuggestion;
