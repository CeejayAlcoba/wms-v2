import type { ChangePasswordDTO } from "../@types/DTOs/ChangePasswordDTO";
import * as yup from "yup";
import { requiredMessage } from "./yupInitials";

export const changeCurrentPasswordSchema: yup.Schema<ChangePasswordDTO> = yup
  .object()
  .shape({
    currentPassword: yup.string().required(requiredMessage),
    password: yup
      .string()
      .required(requiredMessage)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required(requiredMessage),
  });
