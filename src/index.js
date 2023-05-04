import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeProvider from "./context/ThemeProvider";
import AssetProvider from "./context/AssetProvider";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AssetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AssetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
