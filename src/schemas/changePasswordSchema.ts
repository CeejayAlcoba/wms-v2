import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { ChangePasswordDTO } from "../@types/DTOs/ChangePasswordDTO";

export const changePasswordSchema: yup.Schema<ChangePasswordDTO> = yup
  .object()
  .shape({
    password: yup
      .string()
      .required(requiredMessage)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(requiredMessage),
  });
