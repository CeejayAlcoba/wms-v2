import * as yup from "yup";
import type { LoginDTO } from "../@types/DTOs/LoginDTO";
import { requiredMessage } from "./yupInitials";

export const loginSchema: yup.Schema<LoginDTO> = yup.object({
  username: yup.string().required(requiredMessage),
  password: yup.string().required(requiredMessage),
});
