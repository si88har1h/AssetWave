import { createContext } from "react";

const AssetContext = createContext({
  assets: [],
  setAssets: () => {},
});

export default AssetContext;
