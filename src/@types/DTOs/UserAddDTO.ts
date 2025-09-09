import type { UserDTO } from "./UserDTO";

export type UserAddDTO = {
  password?: string | null;
  confirmPassword?: string | null;
  employeeNumber?: string | null;
  birthday?: string | null;
} & UserDTO;
