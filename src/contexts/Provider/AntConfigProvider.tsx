import { useState } from "react";
import { AntConfigContext } from "../useAntConfig";
import { ConfigProvider, theme } from "antd";
import { THEME_MODE } from "../../constants/LOCAL_STORAGE_KEYS";

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

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntConfigContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
      </AntConfigContext.Provider>
    </ConfigProvider>
  );
};
