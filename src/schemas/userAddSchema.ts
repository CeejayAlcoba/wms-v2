import * as Yup from "yup";
import type { UserAddDTO } from "../@types/DTOs/UserAddDTO";
import { requiredMessage } from "./yupInitials";

export const userAddSchema: Yup.ObjectSchema<UserAddDTO> = Yup.object().shape({
  username: Yup.string().required(requiredMessage),
  firstName: Yup.string().required(requiredMessage),
  lastName: Yup.string().required(requiredMessage),
  employeeNumber: Yup.string().required(requiredMessage),
  birthday: Yup.string().required(requiredMessage),
  isApproved: Yup.boolean().nullable().default(false),
  password: Yup.string()
    .required(requiredMessage)
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required(requiredMessage),
}) as Yup.ObjectSchema<UserAddDTO>;
