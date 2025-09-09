export type ChangePasswordDTO = {
  token?: string;
  password: string | null;
  confirmPassword: string | null;
};
