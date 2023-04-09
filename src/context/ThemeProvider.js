import { ThemeContext } from "./theme-context";
import { useState } from "react";

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(() => {
    const themeStorage = JSON.parse(localStorage.getItem("themeKey"));
    return themeStorage;
  });
  const toggleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
