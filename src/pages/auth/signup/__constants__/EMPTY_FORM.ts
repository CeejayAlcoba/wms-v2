import type { UserAddDTO } from "../../../../@types/DTOs/UserAddDTO";

export const EMPTY_FORM: UserAddDTO = {
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
