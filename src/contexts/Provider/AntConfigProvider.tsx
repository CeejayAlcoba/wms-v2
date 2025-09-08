import { useState } from "react";
import { AntConfigContext } from "../useAntConfig";
import { ConfigProvider, theme } from "antd";
import { THEME_MODE } from "../../constants/LOCAL_STORAGE_KEYS";
import useWindowWidth from "../../hooks/useWindowWidth";

export type ThemeModeType = "dark" | "light";

export const AntConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleIsDarkMode = () => {
    var mode: ThemeModeType =
      (localStorage.getItem(THEME_MODE) as ThemeModeType) ?? "light";
    return mode == "dark";
  };
  const [isDarkMode, setIsDarkMode] = useState<boolean>(handleIsDarkMode());

  const toggleTheme = () => {
    let newMode: ThemeModeType = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem(THEME_MODE, newMode);
  };
  const {windowWidth} =useWindowWidth()

  const cardPadding = windowWidth> 425 ? 20 : 5;
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            padding: cardPadding,
            paddingLG: cardPadding,
            paddingMD: cardPadding,
            paddingSM: cardPadding,
          },
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntConfigContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
      </AntConfigContext.Provider>
    </ConfigProvider>
  );
};
