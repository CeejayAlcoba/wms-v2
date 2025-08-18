import type { UserDTO } from "./UserDTO";

export type UserWithPasswordDTO = {
  password?:string | null,
  confirmPassword?:string| null,
} & UserDTO;