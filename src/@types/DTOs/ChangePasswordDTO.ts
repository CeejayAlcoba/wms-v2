export type ChangePasswordDTO = {
  token?: string;
  currentPassword?: string | null;
  password: string | null;
  confirmPassword: string | null;
};
