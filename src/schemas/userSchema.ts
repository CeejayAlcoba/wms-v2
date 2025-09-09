import * as Yup from "yup";

import type { UserDTO } from "../@types/DTOs/UserDTO";
import { requiredMessage } from "./yupInitials";
import { roleSchema } from "./roleSchema";

export const userSchema: Yup.Schema<UserDTO> = Yup.object().shape({
  username: Yup.string().required(requiredMessage),
  firstName: Yup.string().required(requiredMessage),
  lastName: Yup.string().required(requiredMessage),
  employeeNumber: Yup.string().required(requiredMessage),
  roles: Yup.array()
    .of(roleSchema)
    .min(1, "At least one role is required")
    .required(requiredMessage),
});
