import { jwtDecode } from "jwt-decode";
import type { UserDTO } from "../@types/DTOs/UserDTO";
import { TOKEN_KEY } from "../constants/LOCAL_STORAGE_KEYS";
import type { JWTPayload } from "../contexts/Provider/UserProvider";
import type { RoleDTO } from "../@types/DTOs/RoleDTO";

const handleDecodeJwt = (token?: string) => {
  const myToken = token ?? localStorage.getItem(TOKEN_KEY);
  if (myToken) {
    const decoded: JWTPayload = jwtDecode(myToken);
    const user: UserDTO = {
      id: Number(decoded.UserId),
      username: decoded.Username,
      firstName: decoded.FirstName,
      lastName: decoded.LastName,
      isApproved: decoded.IsApproved == "True",
      isMaster: decoded.IsMaster == "True",
      roles: decoded.Roles ? (JSON.parse(decoded.Roles) as RoleDTO[]) : [],
    };
    return user;
  }
  localStorage.clear();
  return null;
};

export default handleDecodeJwt;
