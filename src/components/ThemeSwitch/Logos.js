import logoMoon from "../../assets/moon.png";
import logoSun from "../../assets/sun.png";

export const darkModeBtn = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 20,
    }}
  >
    <img src={logoMoon} alt="moon logo" width="70%" />
  </div>
);

export const lightModeBtn = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      color: "red",
      fontSize: 18,
    }}
  >
    <img src={logoSun} alt="sun logo" width="70%" />
  </div>
);

export const uncheckedIcon = null;
export const checkedIcon = null;
