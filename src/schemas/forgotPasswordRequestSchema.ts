import * as yup from "yup";
import type { ForgotPasswordRequestDTO } from "../@types/DTOs/ForgotPasswordRequestDTO";
import { requiredMessage } from "./yupInitials";

export const forgotPasswordRequestSchema: yup.Schema<ForgotPasswordRequestDTO> =
  yup.object().shape({
    username: yup.string().required(requiredMessage),
    employeeNumber: yup.string().required(requiredMessage),
    birthday: yup.string().required(requiredMessage),
  });
