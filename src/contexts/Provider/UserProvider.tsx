import React, { useState } from "react";
import type { UserDTO } from "../../@types/DTOs/UserDTO";
import { TOKEN_KEY, USER_KEY } from "../../constants/LOCAL_STORAGE_KEYS";
import { UserContext } from "../useUser";
import { jwtDecode } from "jwt-decode";
import type { RoleDTO } from "../../@types/DTOs/RoleDTO";
import handleDecodeJwt from "../../utils/handleDecodeJWT";

export interface JWTPayload {
  UserId: string;
  Username: string;
  FirstName: string;
  LastName: string;
  EmployeeNumber: string;
  Birthday: string;
  IsApproved: "True" | "False";
  IsMaster: "True" | "False";
  Roles: string;
  exp: number;
}
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const handleGetUserLogged = () => {
    return handleDecodeJwt();
  };
  const [user, setUser] = useState<UserDTO | null>(handleGetUserLogged());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
