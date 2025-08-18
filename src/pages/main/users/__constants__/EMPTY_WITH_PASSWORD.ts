import type { UserWithPasswordDTO } from "../../../../@types/DTOs/UserWithPasswordDTO";

export const EMPTY_WITH_PASSWORD: UserWithPasswordDTO = {
  username: null,
  firstName: null,
  lastName: null,
  employeeNumber: null,
  birthday: null,
  password: null,
  confirmPassword: null,
  roles: [],
};
