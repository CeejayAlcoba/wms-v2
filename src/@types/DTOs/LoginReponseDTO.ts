import type { UserDTO } from "./UserDTO";

export type LoginResponseDTO = {
  user: UserDTO;
  token: string;
};
