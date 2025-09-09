import type { UserAddDTO } from "../../../../@types/DTOs/UserAddDTO";

export const EMPTY_WITH_PASSWORD: UserAddDTO = {
  username: null,
  firstName: null,
  lastName: null,
  employeeNumber: null,
  birthday: null,
  password: null,
  confirmPassword: null,
  roles: [],
};
