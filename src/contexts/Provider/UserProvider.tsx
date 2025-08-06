import React, { useState } from "react";
import type { UserDTO } from "../../@types/DTOs/UserDTO";
import { USER_KEY } from "../../constants/LOCAL_STORAGE_KEYS";
import { UserContext } from "../useUser";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const handleGetUserLogged = () => {
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;

    return JSON.parse(user);
  };
  const [user, setUser] = useState<UserDTO | null>(handleGetUserLogged());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
