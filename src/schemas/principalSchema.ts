import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefPrincipal } from "../@types/tables/RefPrincipal";

export const principalSchema: yup.Schema<RefPrincipal> = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required(requiredMessage),
  address: yup.string().required(requiredMessage),
});
