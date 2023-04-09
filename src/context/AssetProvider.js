import { useState } from "react";
import AssetContext from "./asset-context";

const AssetProvider = (props) => {
  const [assets, setAssets] = useState(() => {
    const base = [
      {
        uuid: "Qwsogvtv82FCd",
        symbol: "BTC",
        name: "Bitcoin",
        price: "9370.9993109108",
        change: "-0.52",
        priceData: [
          "9515.0454185372",
          "9540.1812284677",
          "9554.2212643043",
          "9593.571539283",
          "9592.8596962985",
          "9562.5310295967",
          "9556.7860427046",
          "9388.823394515",
          "9335.3004209165",
          "9329.4331700521",
          "9370.9993109108",
        ],
      },
    ];
    const saved = localStorage.getItem("dataKey");
    const initialValue = JSON.parse(saved);
    return initialValue || base;
  });

  const assetContext = {
    assets: assets,
    setAssets: setAssets,
  };
  return (
    <AssetContext.Provider value={assetContext}>
      {props.children}
    </AssetContext.Provider>
  );
};

export default AssetProvider;
