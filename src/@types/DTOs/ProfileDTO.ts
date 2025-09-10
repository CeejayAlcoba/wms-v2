import type { UserAddDTO } from "./UserAddDTO";

export type ProfileDTO = Omit<
  UserAddDTO,
  "password" | "confirmPassword" | "roles" | "isMaster"
>;
