import { createContext, useContext } from "react";

interface AntConfigContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const AntConfigContext = createContext<AntConfigContextProps | null>(
  null
);

export const useAntConfig = () => {
  const context = useContext(AntConfigContext);
  if (!context)
    throw new Error("useAntConfig must be used within AntConfigProvider");
  return context;
};
