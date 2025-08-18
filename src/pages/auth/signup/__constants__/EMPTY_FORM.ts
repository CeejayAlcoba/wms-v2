import type { UserWithPasswordDTO } from "../../../../@types/DTOs/UserWithPasswordDTO";

export const EMPTY_FORM: UserWithPasswordDTO = {
  password: null,
  confirmPassword: null,
  roles: [],
  id: null,
  username: null,
  firstName: null,
  lastName: null,
  employeeNumber: null,
  birthday: null,
  isApproved: null,
};
