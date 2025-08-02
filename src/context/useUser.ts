import { createContext, useContext } from "react";
import type { UserDTO } from "../@types/DTOs/UserDTO";

type UserContextType = {
  user: UserDTO | null;
  setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("SidebarContext is null");

  return context;
};

export default useUser;
