import Header from "./components/Header/Header";
import Assets from "./components/AssetContainer/Assets";
import { Fragment, useContext, useEffect } from "react";
import AssetContext from "./context/asset-context";
import { ThemeContext } from "./context/theme-context";
function App() {
  const assetCtx = useContext(AssetContext);
  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(assetCtx.assets));
    localStorage.setItem("themeKey", JSON.stringify(themeCtx.theme));
  }, [assetCtx.assets, themeCtx.theme]);

  return (
    <Fragment>
      <Header />
      <Assets />
    </Fragment>
  );
}

export default App;
