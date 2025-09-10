import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { ProfileDTO } from "../@types/DTOs/ProfileDTO";

export const profileSchema: yup.Schema<ProfileDTO> = yup.object().shape({
  username: yup.string().required(requiredMessage),
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  employeeNumber: yup.string().required(requiredMessage),
  birthday: yup.string().required(requiredMessage),
});
