import styles from "./Header.module.css";
import logoDark from "../../assets/logoDark.svg";
import logoLight from "../../assets/logoLight.svg";
import ReactSwitch from "react-switch";
import { darkModeBtn, lightModeBtn } from "../ThemeSwitch/Logos";
import { ThemeContext } from "../../context/theme-context";
import { useContext, useEffect } from "react";

const Header = () => {
  const themeCtx = useContext(ThemeContext);
  const logoState = themeCtx.theme === "dark" ? logoLight : logoDark;
  const themeClass = themeCtx.theme === "dark" ? "dark" : "light";

  useEffect(() => {
    document.querySelector("body").classList.add(`${themeCtx.theme}__mode`);

    return () => {
      document
        .querySelector("body")
        .classList.remove(`${themeCtx.theme}__mode`);
    };
  }, [themeCtx.theme]);

  return (
    <header className={`${styles.header} ${styles[`${themeClass}`]}`}>
      <img src={logoState} alt="app logo" className={styles.headerImage} />
      <div className={styles.headerToggle}>
        <ReactSwitch
          uncheckedHandleIcon={lightModeBtn}
          checkedHandleIcon={darkModeBtn}
          uncheckedIcon={null}
          checkedIcon={null}
          onChange={themeCtx.toggleTheme}
          checked={themeCtx.theme === "dark"}
          activeBoxShadow={null}
          onColor="#32d74b"
        />
      </div>
    </header>
  );
};

export default Header;
