import type { ChangePasswordDTO } from "../../../../@types/DTOs/ChangePasswordDTO";

export const EMPTY_CHANGE_PASSWORD: ChangePasswordDTO = {
  currentPassword: null,
  password: null,
  confirmPassword: null,
};
